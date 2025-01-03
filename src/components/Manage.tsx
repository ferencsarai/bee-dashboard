import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import MoreFillIcon from 'remixicon-react/MoreFillIcon'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      backgroundColor: '#ffffff',
      fontSize: '12px',
      display: 'flex',
      width: '65px',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    },
  }),
)

const Manage = (): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <MoreFillIcon size={20} />
      <div>Manage</div>
    </div>
  )
}

export default Manage
