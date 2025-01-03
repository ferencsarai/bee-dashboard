import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import CheckboxMultipleLineIcon from 'remixicon-react/CheckboxMultipleLineIcon'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      backgroundColor: '#ffffff',
      fontSize: '12px',
      display: 'flex',
      width: '65px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    },
  }),
)

const Selection = (): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <CheckboxMultipleLineIcon size={20} />
      <div>Select all</div>
    </div>
  )
}

export default Selection
