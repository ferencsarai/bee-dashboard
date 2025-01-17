import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import SwarmIcon from '../assets/swarmIcon.png'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      backgroundColor: '#DE7700',
      fontSize: '12px',
      fontFamily: '"iAWriterMonoV", monospace',
      width: '65px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      color: '#FCFCFC',
      '&:hover': {
        backgroundColor: '#DE7700',
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
      width: '150px',
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
  }),
)

const Upload = (): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <img src={SwarmIcon} alt="" height="16" />
      <div>Upload</div>

      <div className={classes.dropdown}>
        <div>Files and folders</div>
        <div>WEBsite</div>
      </div>
    </div>
  )
}

export default Upload
