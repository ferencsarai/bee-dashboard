import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import ShareFillIcon from 'remixicon-react/ShareFillIcon'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      backgroundColor: '#ffffff',
      fontSize: '12px',
      width: '100px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    },
  }),
)

const Sharing = (): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <ShareFillIcon size={20} />
      <div>Share</div>
    </div>
  )
}

export default Sharing
