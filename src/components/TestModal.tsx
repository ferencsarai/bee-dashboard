import { ReactElement, ReactNode, useState } from 'react'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormHelperText from '@material-ui/core/FormHelperText'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import SwitchMode from './justTesting/SwitchMode'
import { BuyAndSwap } from './justTesting/BuyAndSwap'
import PresentSuccess from './justTesting/PresentSuccess'
import Slide from '@material-ui/core/Slide'

interface Props {
  someParam: string
  otherParam: number
  icon?: ReactNode
}

export default function TestModal({ someParam, otherParam, icon }: Props) {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [value, setValue] = useState(0)
  const [mode, setMode] = useState('lightnode')

  const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true)
    e.stopPropagation()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleModeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.value)
  }

  const handleAction = () => {
    return otherParam * 2
  }

  const loadedComponent = switchComponent()

  function switchComponent() {
    switch (currentStep) {
      case 0:
        return <SwitchMode mode={mode} handleModeSwitch={handleModeSwitch} />
      case 1:
        return <BuyAndSwap mode={mode} />
      case 2:
        return <PresentSuccess />
      default:
        return <p>{'Error'}</p>
    }
  }

  const steps = ['Choose mode', 'Fund', 'Stake BZZ']

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} startIcon={icon}>
        {'Upgrade Node'}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="from-dialog-title"
        fullWidth
        maxWidth={'xl'}
        transitionDuration={0}
      >
        <DialogContent>
          <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label} onClick={() => setCurrentStep(index)}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {loadedComponent}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
