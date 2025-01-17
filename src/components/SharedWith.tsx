import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '5px 15px',

      backgroundColor: '#FFFFFF',
      fontFamily: '"iAWriterMonoV", monospace',
      fontSize: '12px',
    },
  }),
)

interface Props {
  text?: 'For me' | 'Our files'
}

const ShareIcon = (props: Props): ReactElement => {
  const classes = useStyles()

  return <div className={classes.container}>{props.text}</div>
}

export default ShareIcon
