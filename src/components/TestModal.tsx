import { ReactElement, ReactNode, useState } from 'react'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormHelperText from '@material-ui/core/FormHelperText'

interface Props {
  someParam: string
  otherParam: number
  icon?: ReactNode
}

export default function TestModal({ someParam, otherParam, icon }: Props) {
  const [open, setOpen] = useState(false)
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

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} startIcon={icon}>
        {'label'}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="from-dialog-title">
        <DialogTitle id="form-dialog-title">{'Ez a cím'}</DialogTitle>
        <DialogContent>
          <DialogContentText>{'Ez itt a DialogContentText'}</DialogContentText>
          <Input
            autoFocus
            margin="dense"
            id="name"
            type="text"
            placeholder="Tegyük fel van input"
            fullWidth
            value={value}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
              setValue(Number(e.target.value))
            }
          />
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
