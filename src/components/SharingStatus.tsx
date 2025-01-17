import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      width: '100%',
      height: '100%',
      gap: '15px',
      backgroundColor: '#ffffff',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '5px 15px',
      fontFamily: '"iAWriterMonoV", monospace',
      fontSize: '10px',
      flexGrow: 1,
    },
  }),
)

const SharingStatus = (): ReactElement => {
  const classes = useStyles()

  return <div className={classes.container}></div>
}

export default SharingStatus
