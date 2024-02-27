import { BeeModes } from '@ethersphere/bee-js'
import { Box, Typography } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import ExpandableListItemKey from '../ExpandableListItemKey'
import { TextField, Button } from '@material-ui/core'
import { Loading } from '../Loading'
import { SwarmDivider } from '../SwarmDivider'
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
  setCurrentStep: (newStep: number) => void
}

export function BuyAndSwap({ mode, setCurrentStep }: Props) {
  const [loading, setLoading] = useState(false)
  const [hasSwapped, setSwapped] = useState(false)
  const [price, setPrice] = useState(DaiToken.fromDecimal('0.6'))
  const minXdai = 0.001
  const minXbzz = mode === 'fullnode' ? 0.001 : 0.1
  const [oldBalance, setOldBalance] = useState<DaiToken | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [daiToBuy, setDaiToBuy] = useState<DaiToken | null>(null)
  const [bzzAfterSwap, setBzzAfterSwap] = useState(minXbzz)
  const [daiAfterSwap, setDaiAfterSwap] = useState(minXdai)

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

  // Recalculate xDAI to buy, if price changes
  useEffect(() => {
    const finalDaiAmount = calculateDaiToBuy(daiAfterSwap, bzzAfterSwap)
    // eslint-disable-next-line no-console
    console.log('finalDaiAmount: ', finalDaiAmount)
    const daiObj = DaiToken.fromDecimal(finalDaiAmount.toString())
    setDaiToBuy(daiObj)
  }, [price])

  // Look for balance change
  useEffect(() => {
    if (oldBalance === null && balance) {
      setOldBalance(DaiToken.fromDecimal(balance.dai.toDecimal))

      return
    }

    if (oldBalance !== null && balance?.dai.toDecimal && balance?.dai.toDecimal.gt(oldBalance.toDecimal)) {
      // eslint-disable-next-line no-console
      console.log('New balance: ', balance)

      if (daiToBuy && balance.dai.toDecimal.gt(daiToBuy.toDecimal)) {
        enqueueSnackbar(<span>{'Funds received. Performing swap...'}</span>, { variant: 'success' })
        startSwap()
      } else {
        enqueueSnackbar(<span>{'Not enough xDAI was sent in'}</span>, { variant: 'error' })
      }
    }
  }, [balance])

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

  async function startSwap() {
    if (hasSwapped || !daiToBuy) {
      return
    }
    setLoading(true)
    setSwapped(true)

    try {
      const daiAmount = bzzAfterSwap * Number(price.toFixedDecimal(4))
      await performSwapWithChecks(DaiToken.fromDecimal(daiAmount.toString()))
      const message = canUpgradeToLightNode
        ? 'Successfully swapped. Beginning light node upgrade...'
        : 'Successfully swapped. Now you can stake some BZZ.'
      enqueueSnackbar(message, { variant: 'success' })

      if (canUpgradeToLightNode) await restart()

      if (mode === 'fullnode') setCurrentStep(2)
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

  function changeBzz(event: React.ChangeEvent<HTMLInputElement>) {
    if (Number(event.target.value) > minXbzz) {
      setBzzAfterSwap(Number(event.target.value))
      const finalDaiAmount = calculateDaiToBuy(daiAfterSwap, Number(event.target.value))
      const daiObj = DaiToken.fromDecimal(finalDaiAmount.toString())
      setDaiToBuy(daiObj)
    }
  }

  function changeDai(event: React.ChangeEvent<HTMLInputElement>) {
    if (Number(event.target.value) > minXdai) {
      setDaiAfterSwap(Number(event.target.value))
      const finalDaiAmount = calculateDaiToBuy(Number(event.target.value), bzzAfterSwap)
      const daiObj = DaiToken.fromDecimal(finalDaiAmount.toString())
      setDaiToBuy(daiObj)
    }
  }

  function calculateDaiToBuy(daiAmount: number, bzzAmount: number) {
    const PRICE_VOLATILITY_FACTOR = 1.05

    return daiAmount + bzzAmount * (Number(price.toDecimal) * PRICE_VOLATILITY_FACTOR)
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
      <Box mb={0.25}>
        <Typography>
          {'Resulting xDAI balance after funds are received. You will need minimum '}
          {minXdai}
          {' xDAI'}
        </Typography>
        <TextField
          label="xDAI"
          value={daiAfterSwap}
          onChange={changeDai}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
      <Box mb={2}>
        <Typography>
          {'Resulting xBZZ balance after funds are received. You will need minimum '}
          {minXbzz}
          {' xBZZ'}
        </Typography>
        <TextField
          label="xBZZ"
          value={bzzAfterSwap}
          onChange={changeBzz}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
    </>
  )
}
