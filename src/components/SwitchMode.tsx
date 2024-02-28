/** This component is used in the Full Node Upgdrade modal */
import React from 'react'
import Box from '@material-ui/core/Box'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { BeeModes } from '@ethersphere/bee-js'

interface Props {
  mode: string
  handleModeSwitch: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SwitchMode({ mode, handleModeSwitch }: Props) {
  return (
    <Box mb={0.25}>
      <div>
        <p>Chose the mode:</p>
        <RadioGroup value={mode} onChange={handleModeSwitch}>
          <FormControlLabel
            value={BeeModes.LIGHT}
            control={<Radio />}
            label="Light node - Can upload files, but can't earn BZZ"
          />
          <FormControlLabel
            value={BeeModes.FULL}
            control={<Radio />}
            label="Full node - Can upload files, can earn BZZ, need to stake min 10 BZZ"
          />
        </RadioGroup>
      </div>
    </Box>
  )
}
