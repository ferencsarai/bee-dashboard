import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import CloseCircleLineIcon from 'remixicon-react/CloseCircleLineIcon'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      backgroundColor: '#ffffff',
      fontSize: '12px',
      display: 'flex',
      width: '100px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    },
  }),
)

const FreeUp = (): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <CloseCircleLineIcon size={20} />
      <div>Free up</div>
    </div>
  )
}

export default FreeUp
