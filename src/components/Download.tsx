import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import DownloadIcon from './DownloadIcon'
import NotificationSign from './NotificationSign'

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
      fontFamily: '"iAWriterMonoV", monospace',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
      '&:hover $dropdown': {
        display: 'flex',
      },
    },
    dropdown: {
      display: 'none',
      backgroundColor: '#ffffff',
      position: 'absolute',
      top: '100%',
      zIndex: 1,
      width: '200px',
      flexDirection: 'column',
      justifyContent: 'left',
      alignItems: 'center',
      boxSizing: 'border-box',
      color: '#333333',
      '& div': {
        width: '100%',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        padding: '10px',
      },
      '& div:hover': {
        backgroundColor: '#DE7700',
        color: '#ffffff',
      },
    },
    absoluteRight: {
      position: 'absolute',
      right: '5px',
      top: '2px',
    },
  }),
)

interface Props {
  notificationText?: string
}

const Download = (props: Props): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <DownloadIcon />

      <div>Download</div>
      {props.notificationText ? (
        <div className={classes.absoluteRight}>
          <NotificationSign text={props.notificationText} />
        </div>
      ) : null}
      <div className={classes.dropdown}>
        <div>Start downloading queue</div>
        <div>Clear queue</div>
      </div>
    </div>
  )
}

export default Download
