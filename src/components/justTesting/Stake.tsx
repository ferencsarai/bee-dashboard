import React, { useContext, useEffect, useState } from 'react'
import { addStake, restartBeeNode } from '../../utils/desktop'
import { Context as SettingsContext } from '../../providers/Settings'
import { Typography, TextField, Button } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { ROUTES } from '../../routes'
import { sleepMs } from '../../utils'
import { useNavigate } from 'react-router'

const BZZ = '00000000000000000'

const MINIMUM_STAKE = '10'

interface Props {
  isActionTriggered: boolean
  close: () => void
}

export default function Stake({ isActionTriggered, close }: Props) {
  const { desktopUrl } = useContext(SettingsContext)
  const [amount, setAmount] = useState('10')
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()

  useEffect(() => {
    if (isActionTriggered) stakeTest()
  }, [isActionTriggered])

  async function stakeTest() {
    try {
      const result = await addStake(desktopUrl, BigInt(amount + BZZ))
      // eslint-disable-next-line no-console
      console.log('Result: ', result)
      const message = 'You succesfully staked some BZZ! Now you have a full node.'
      enqueueSnackbar(<span>{message}</span>, { variant: 'success' })
      close()
      await restart()
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('Error: ', error)
      enqueueSnackbar(<span>{error.message}</span>, { variant: 'error' })
    }
  }

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

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (Number(event.target.value) >= 10) {
      setAmount(event.target.value)
    }
  }

  return (
    <>
      <div>
        <Typography>
          {'Stake some BZZ to take part in the Redistribution Game. Minimum amount is '}
          {MINIMUM_STAKE}
          {' BZZ.'}
        </Typography>
        <Typography>{'With higher stake, you will have higher chances to win.'}</Typography>
        <TextField
          label="Amount"
          value={amount}
          onChange={handleChange}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Typography style={{ fontWeight: 'bold' }}>{"Warning! You won't get this money back!"}</Typography>
      </div>
    </>
  )
}
