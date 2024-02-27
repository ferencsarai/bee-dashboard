import { BeeModes } from '@ethersphere/bee-js'
import { Box, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { ReactElement, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import ArrowDown from 'remixicon-react/ArrowDownCircleLineIcon'
import Check from 'remixicon-react/CheckLineIcon'
import ExpandableListItem from '../ExpandableListItem'
import ExpandableListItemActions from '../ExpandableListItemActions'
import ExpandableListItemKey from '../ExpandableListItemKey'
import { HistoryHeader } from '../HistoryHeader'
import { Loading } from '../Loading'
import { SwarmButton } from '../SwarmButton'
import { SwarmDivider } from '../SwarmDivider'
import { SwarmTextInput } from '../SwarmTextInput'
import { BzzToken, BZZ_DECIMAL_PLACES } from '../../models/BzzToken'
import { DaiToken } from '../../models/DaiToken'
import { Context as BeeContext } from '../../providers/Bee'
import { Context as SettingsContext } from '../../providers/Settings'
import { Context as BalanceProvider } from '../../providers/WalletBalance'
import { ROUTES } from '../../routes'
import { sleepMs } from '../../utils'
import {
  getBzzPriceAsDai,
  getDesktopConfiguration,
  performSwap,
  restartBeeNode,
  upgradeToLightNode,
} from '../../utils/desktop'
import { Rpc } from '../../utils/rpc'
import { isSwapError, SwapError, wrapWithSwapError } from '../../utils/SwapError'
import { TopUpProgressIndicator } from '../../pages/top-up/TopUpProgressIndicator'

const MINIMUM_XDAI = '0.1'
const MINIMUM_XBZZ = '0.1'

const GENERIC_SWAP_FAILED_ERROR_MESSAGE = 'Failed to swap. The full error is printed to the console.'

interface Props {
  mode: string
}

export function BuyAndSwap({ mode }: Props) {
  const [loading, setLoading] = useState(false)
  const [hasSwapped, setSwapped] = useState(false)
  const [userInputSwap, setUserInputSwap] = useState<string | null>(null)
  const [price, setPrice] = useState(DaiToken.fromDecimal('0.6'))
  const [error, setError] = useState<string | null>(null)
  const [daiToBuy, setDaiToBuy] = useState<DaiToken | null>(null)
  const [bzzAfterSwap, setBzzAfterSwap] = useState<BzzToken | null>(null)
  const [daiAfterSwap, setDaiAfterSwap] = useState<DaiToken | null>(null)

  const { rpcProviderUrl, isDesktop, desktopUrl } = useContext(SettingsContext)
  const { nodeAddresses, nodeInfo } = useContext(BeeContext)
  const { balance } = useContext(BalanceProvider)

  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  // Fetch current price of BZZ
  useEffect(() => {
    // eslint-disable-next-line no-console
    getBzzPriceAsDai(desktopUrl).then(setPrice).catch(console.error)
  }, [desktopUrl])

  // Set the initial xDAI to swap
  useEffect(() => {
    if (!balance || userInputSwap) {
      return
    }

    const minimumOptimalValue = DaiToken.fromDecimal('1').plusBaseUnits(MINIMUM_XDAI).toDecimal

    if (balance.dai.toDecimal.isGreaterThanOrEqualTo(minimumOptimalValue)) {
      // Balance has at least 1 + MINIMUM_XDAI xDai
      setDaiToBuy(balance.dai.minusBaseUnits('1'))
    } else {
      // Balance is low, halve the amount
      setDaiToBuy(new DaiToken(balance.dai.toBigNumber.dividedToIntegerBy(2)))
    }
  }, [balance, userInputSwap])

  // Set the xDAI to swap based on user input
  useEffect(() => {
    setError(null)
    try {
      if (userInputSwap) {
        const dai = DaiToken.fromDecimal(userInputSwap)
        setDaiToBuy(dai)

        if (dai.toDecimal.lte(0)) {
          setError('xDAI to swap must be a positive number')
        }
      }
    } catch {
      setError('Cannot parse xDAI amount')
    }
  }, [userInputSwap])

  // Calculate the amount of tokens after swap
  useEffect(() => {
    if (!balance || !daiToBuy || error) {
      return
    }
    const daiAfterSwap = new DaiToken(balance.dai.toBigNumber.minus(daiToBuy.toBigNumber))
    setDaiAfterSwap(daiAfterSwap)
    const tokensConverted = BzzToken.fromDecimal(
      daiToBuy.toBigNumber.dividedBy(price.toBigNumber).decimalPlaces(BZZ_DECIMAL_PLACES),
    )
    const bzzAfterSwap = new BzzToken(tokensConverted.toBigNumber.plus(balance.bzz.toBigNumber))
    setBzzAfterSwap(bzzAfterSwap)

    if (daiAfterSwap.toDecimal.lt(MINIMUM_XDAI)) {
      setError(`Must keep at least ${MINIMUM_XDAI} xDAI after swap!`)
    } else if (bzzAfterSwap.toDecimal.lt(MINIMUM_XBZZ)) {
      setError(`Must have at least ${MINIMUM_XBZZ} xBZZ after swap!`)
    }
  }, [error, balance, daiToBuy, price])

  if (!balance || !nodeAddresses || !daiToBuy || !bzzAfterSwap || !daiAfterSwap) {
    return <Loading />
  }

  const canUpgradeToLightNode = isDesktop && nodeInfo?.beeMode === BeeModes.ULTRA_LIGHT

  async function restart() {
    try {
      await sleepMs(5_000)
      await restartBeeNode(desktopUrl)

      navigate(ROUTES.RESTART_LIGHT)
    } catch (error) {
      console.error(error) // eslint-disable-line
      enqueueSnackbar(`Failed to upgrade: ${error}`, { variant: 'error' })
    }
  }

  async function sendSwapRequest(daiToSwap: DaiToken) {
    try {
      await performSwap(desktopUrl, daiToSwap.toString)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      throw error
    }
  }

  async function performSwapWithChecks(daiToSwap: DaiToken) {
    if (!localStorage.getItem('apiKey')) {
      throw new SwapError('API key is not set, reopen dashboard through Swarm Desktop')
    }

    let desktopConfiguration = await wrapWithSwapError(
      getDesktopConfiguration(desktopUrl),
      'Unable to reach Desktop API, Swarm Desktop may not be running',
    )

    if (canUpgradeToLightNode) {
      desktopConfiguration = await wrapWithSwapError(
        upgradeToLightNode(desktopUrl, rpcProviderUrl),
        'Failed to update the configuration file with the new swap values using the Desktop API',
      )
    }

    if (!desktopConfiguration['blockchain-rpc-endpoint']) {
      throw new SwapError('Blockchain RPC endpoint is not configured in Swarm Desktop')
    }
    await wrapWithSwapError(
      Rpc.getNetworkChainId(desktopConfiguration['blockchain-rpc-endpoint']),
      `Blockchain RPC endpoint not reachable at ${desktopConfiguration['blockchain-rpc-endpoint']}`,
    )
    await wrapWithSwapError(sendSwapRequest(daiToSwap), GENERIC_SWAP_FAILED_ERROR_MESSAGE)
  }

  async function onSwap() {
    if (hasSwapped || !daiToBuy) {
      return
    }
    setLoading(true)
    setSwapped(true)

    try {
      await performSwapWithChecks(daiToBuy)
      const message = canUpgradeToLightNode
        ? 'Successfully swapped. Beginning light node upgrade...'
        : 'Successfully swapped. Balances will refresh soon. You may now navigate away.'
      enqueueSnackbar(message, { variant: 'success' })

      if (canUpgradeToLightNode) await restart()
    } catch (error) {
      if (isSwapError(error)) {
        // we have a custom and user friendly error message
        enqueueSnackbar(error.snackbarMessage, { variant: 'error' })

        if (error.originalError) {
          console.error(error.originalError) // eslint-disable-line
        }
      } else {
        // we have an unexpected error
        enqueueSnackbar(`${GENERIC_SWAP_FAILED_ERROR_MESSAGE} ${error}`, { variant: 'error' })
        console.error(error) // eslint-disable-line
      }
    } finally {
      balance?.refresh()
      setLoading(false)
    }
  }

  return (
    <>
      <Box mb={2}>
        <Typography style={{ fontWeight: 'bold' }}>
          {'Send in at least '}
          {daiToBuy.toSignificantDigits(2).toString()}
          {' to this address:'}
        </Typography>
      </Box>
      <Box mb={0.25}>
        <ExpandableListItemKey label="Funding wallet address" value={nodeAddresses.ethereum} expanded />
      </Box>
      <Box mb={4}>
        <Typography>
          Make sure to keep at least {MINIMUM_XDAI} xDAI in order to pay for transaction costs on the network.
        </Typography>
      </Box>
      <SwarmDivider mb={4} />
      <Box mb={4}>
        <Typography>
          Your current balance is {balance.dai.toSignificantDigits(4)} xDAI and {balance.bzz.toSignificantDigits(4)}{' '}
          xBZZ.
        </Typography>
      </Box>
      <Box mb={4}>
        <SwarmTextInput
          label="xDAI to swap"
          defaultValue={daiToBuy.toSignificantDigits(4)}
          placeholder={daiToBuy.toSignificantDigits(4)}
          name="x"
          onChange={event => setUserInputSwap(event.target.value)}
        />
        {error && <Typography>{error}</Typography>}
      </Box>
      <Box mb={0.25}>
        <ExpandableListItem
          label="Resulting xDAI balance after operation"
          value={`${daiAfterSwap.toSignificantDigits(4)} xDAI`}
        />
      </Box>
      <Box mb={2}>
        <ExpandableListItem
          label="Resulting xBZZ balance after operation"
          value={`${bzzAfterSwap.toSignificantDigits(4)} xBZZ`}
        />
      </Box>
      <ExpandableListItemActions>
        <SwarmButton
          iconType={Check}
          onClick={onSwap}
          disabled={hasSwapped || loading || error !== null}
          loading={loading}
        >
          {canUpgradeToLightNode ? 'Swap Now and Upgrade' : 'Swap Now'}
        </SwarmButton>
      </ExpandableListItemActions>
    </>
  )
}
