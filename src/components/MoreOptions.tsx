import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import Download2LineIcon from 'remixicon-react/Download2LineIcon'
import CheckboxLineIcon from 'remixicon-react/CheckboxLineIcon'
import Database2FillIcon from 'remixicon-react/Database2FillIcon'
import FileCopyLineIcon from 'remixicon-react/FileCopyLineIcon'
import ShareFillIcon from 'remixicon-react/ShareFillIcon'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      backgroundColor: '#343434',
      color: '#ffffff',
      fontSize: '20px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80px',
      clipPath: 'polygon(0% calc(0% + 12px), calc(0% + 12px) 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
  }),
)

interface Props {
  text: string
}

const MoreOptions = (props: Props): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div>{props.text}</div>
    </div>
  )
}

export default MoreOptions
