import React, { useContext, useEffect, useState } from 'react'
import { addStake } from '../../utils/desktop'
import { Context as SettingsContext } from '../../providers/Settings'
import { Typography, TextField, Button } from '@material-ui/core'

const BZZ = '00000000000000000'

export default function PresentSuccess() {
  const { desktopUrl } = useContext(SettingsContext)
  const [amount, setAmount] = useState('10')

  async function stakeTest() {
    const result = await addStake(desktopUrl, BigInt(amount + BZZ))
    // eslint-disable-next-line no-console
    console.log('Result: ', result)
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (Number(event.target.value) >= 10) {
      setAmount(event.target.value)
    }
  }

  useEffect(() => {
    //stakeTest()
  }, [])

  return (
    <>
      <div>
        <Typography variant="h6" gutterBottom>
          {"Warning! You won't get this money back. Minimum amount is 10 BZZ."}
        </Typography>
        <TextField
          label="Amount"
          value={amount}
          onChange={handleChange}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button variant="contained" color="primary" onClick={stakeTest}>
          Stake
        </Button>
      </div>
    </>
  )
}
