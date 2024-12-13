import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import UploadLineIcon from 'remixicon-react/UploadLineIcon'

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

const Upload = (): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <UploadLineIcon size={20} />
      <div>Upload</div>
    </div>
  )
}

export default Upload
