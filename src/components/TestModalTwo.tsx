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
import TopUp from '../pages/top-up'
import { StepContent } from '@material-ui/core'
import { CryptoTopUpIndex } from '../pages/top-up/CryptoTopUpIndex'

interface Props {
  someParam: string
  otherParam: number
  icon?: ReactNode
}

export default function TestModalTwo({ someParam, otherParam, icon }: Props) {
  const [open, setOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [value, setValue] = useState(0)

  const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(true)
    e.stopPropagation()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAction = () => {
    return otherParam * 2
  }

  const loadedComponent = switchComponent()

  function switchComponent() {
    switch (currentStep) {
      case 0:
        return <CryptoTopUpIndex />
      case 1:
        return <p>2</p>
      case 2:
        return <p>3</p>
      default:
        return <p>{'Error'}</p>
    }
  }

  const steps = ['Send xDAI', 'A második lépés', 'Hármas lépés']

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} startIcon={icon}>
        {'label'}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="from-dialog-title" fullScreen>
        <DialogTitle id="form-dialog-title">{'Ez a cím'}</DialogTitle>
        <DialogContent>
          <DialogContentText>{'Ez itt a DialogContentText'}</DialogContentText>
          <Stepper activeStep={currentStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label} onClick={() => setCurrentStep(index)}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {loadedComponent}
          {value < 0 && <FormHelperText>Ez egy negatív szám. </FormHelperText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Mégsem
          </Button>
          <Button onClick={handleAction} color="primary">
            {'Dolog.'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
