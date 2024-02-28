import React, { useContext, useEffect, useState } from 'react'
import { addStake } from '../../utils/desktop'
import { Context as SettingsContext } from '../../providers/Settings'
import { Typography, TextField, Button } from '@material-ui/core'
import { useSnackbar } from 'notistack'

const BZZ = '00000000000000000'

const MINIMUM_STAKE = '10'

interface Props {
  isActionTriggered: boolean
}

export default function Stake({ isActionTriggered }: Props) {
  const { desktopUrl } = useContext(SettingsContext)
  const [amount, setAmount] = useState('10')
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (isActionTriggered) stakeTest()
  }, [isActionTriggered])

  async function stakeTest() {
    try {
      const result = await addStake(desktopUrl, BigInt(amount + BZZ))
      // eslint-disable-next-line no-console
      console.log('Result: ', result)
      throw result
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('Error: ', error)
      enqueueSnackbar(<span>{error.message}</span>, { variant: 'error' })
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
