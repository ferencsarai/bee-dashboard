import { ReactNode, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import SwitchMode from './justTesting/SwitchMode'
import { BuyAndSwap } from './justTesting/BuyAndSwap'
import Stake from './justTesting/Stake'
import { CircularProgress } from '@material-ui/core'
import { BeeModes } from '@ethersphere/bee-js'

interface Props {
  someParam: string
  otherParam: number
  icon?: ReactNode
}

export default function TestModal({ someParam, otherParam, icon }: Props) {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [actionTriggered, setActionTriggered] = useState(false)
  const [mode, setMode] = useState(BeeModes.LIGHT)

  const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true)
    e.stopPropagation()
  }

  const handleClose = () => {
    setCurrentStep(0)
    setMode(BeeModes.LIGHT)
    setActionTriggered(false)
    setOpen(false)
  }

  const handleModeSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.value as BeeModes)
  }

  const loadedComponent = switchComponent()

  function switchComponent() {
    switch (currentStep) {
      case 0:
        return <SwitchMode mode={mode} handleModeSwitch={handleModeSwitch} />
      case 1:
        return <BuyAndSwap mode={mode} setCurrentStep={setCurrentStep} />
      case 2:
        return <Stake isActionTriggered={actionTriggered} close={handleClose} />
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
              <Step key={label}>
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
          {currentStep === 0 && (
            <Button variant="contained" color="primary" onClick={() => setCurrentStep(1)}>
              Next
            </Button>
          )}
          {currentStep === 1 && (
            <Button variant="contained" color="primary" disabled>
              <CircularProgress />
            </Button>
          )}
          {currentStep === 2 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActionTriggered(true)}
              disabled={actionTriggered}
            >
              Stake
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  )
}
