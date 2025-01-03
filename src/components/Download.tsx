import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import Download2LineIcon from 'remixicon-react/Download2LineIcon'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      backgroundColor: '#ffffff',
      fontSize: '12px',
      width: '65px',
      height: '100%',
      display: 'flex',
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

const Download = (): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Download2LineIcon size={20} />
      <div>Download</div>
    </div>
  )
}

export default Download
