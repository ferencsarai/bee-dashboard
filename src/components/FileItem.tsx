import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import Download2LineIcon from 'remixicon-react/Download2LineIcon'
import CheckboxLineIcon from 'remixicon-react/CheckboxLineIcon'
import Database2FillIcon from 'remixicon-react/Database2FillIcon'
import FileCopyLineIcon from 'remixicon-react/FileCopyLineIcon'
import ShareFillIcon from 'remixicon-react/ShareFillIcon'
import MoreOptions from './MoreOptions'
import InfoIcon from './InfoIcon'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      padding: '10px',
      backgroundColor: '#ffffff',
      fontSize: '12px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
    },
    flexDisplay: {
      display: 'flex',
      alignItems: 'center',
    },
    flexRight: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    fileName: {
      fontSize: '20px',
      marginLeft: '10px',
      marginRight: '10px',
    },
    size: {
      fontWeight: 'bold',
      marginLeft: '30px',
    },
    hashRow: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '20px',
    },
    hash: {
      marginLeft: '10px',
      marginRight: '10px',
    },
    expires: {
      display: 'flex',
      alignItems: 'center',
      color: 'orange',
    },
    moreoptions: {
      position: 'absolute',
      bottom: '0',
      right: '0',
    },
  }),
)

interface Props {
  name: string
  size: number
  hash: string
  expires: string
}

const FileItem = (props: Props): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div>
        <div className={classes.flexDisplay}>
          <CheckboxLineIcon size="20" />

          <div className={classes.fileName}>{props.name}</div>
          <Download2LineIcon size="20" />
        </div>
        <div className={classes.size}>{props.size} GB</div>
        <div className={classes.hashRow}>
          <Database2FillIcon size="12" />
          <div className={classes.hash}>{props.hash}</div>
          <FileCopyLineIcon size="12" />
        </div>
      </div>
      <div className={classes.flexRight}>
        <div className={classes.flexDisplay}>
          Shared with me <ShareFillIcon size="12" />
        </div>
        <div className={classes.expires}>
          Expires {props.expires} <InfoIcon />
        </div>
        <div className={classes.moreoptions}>
          <MoreOptions text="..." />
        </div>
      </div>
    </div>
  )
}

export default FileItem
