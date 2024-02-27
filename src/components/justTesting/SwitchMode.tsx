import React, { useContext, useState } from 'react'
import Box from '@material-ui/core/Box'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ExpandableListItemKey from '../ExpandableListItemKey'
import { Context } from '../../providers/Bee'
import { Context as BalanceProvider } from '../../providers/WalletBalance'

interface Props {
  mode: string
  handleModeSwitch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SwitchMode({ mode, handleModeSwitch }: Props) {
  const { nodeAddresses } = useContext(Context)
  const { balance } = useContext(BalanceProvider)

  if (!nodeAddresses?.ethereum) {
    return <p>{'Could not load wallet...'}</p>
  }

  return (
    <Box mb={0.25}>
      <div>
        <p>Chose the mode:</p>
        <RadioGroup value={mode} onChange={handleModeSwitch}>
          <FormControlLabel
            value={'lightnode'}
            control={<Radio />}
            label="Light node - Can upload files, but can't earn BZZ"
          />
          <FormControlLabel
            value={'fullnode'}
            control={<Radio />}
            label="Full node - Can upload files, can earn BZZ, need to stake min 10 BZZ"
          />
        </RadioGroup>
      </div>
    </Box>
  )
}
