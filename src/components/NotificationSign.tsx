import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '16px',
      width: '16px',
      borderRadius: '50%',
      backgroundColor: '#D00000',
      fontFamily: '"iAWriterMonoS", monospace',
      color: '#FCFCFC',
      fontSize: '7px',
      fontWeight: 700,
    },
    oneCharacterFontSize: {
      fontSize: '12px',
    },
  }),
)

interface Props {
  text?: string
}

const NotificationSign = (props: Props): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <span className={props.text?.length === 1 ? classes.oneCharacterFontSize : ''}>{props.text}</span>
    </div>
  )
}

export default NotificationSign
