import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import { useState } from 'react'
import Preview from './Preview'
import FileTypeIcon from './FileTypeIcon'
import Edit from './Edit'
import SharedIcon from './SharedIcon'
import DownloadQueueIcon from './DownloadQueueIcon'
import FolderEnteringIcon from './FolderEnteringIcon'
import NoteIcon from './NoteIcon'
import LabelIcon from './LabelIcon'
import NotificationSign from './NotificationSign'
import FileModal from './FileModal'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      backgroundColor: '#ffffff',
      fontSize: '12px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
    },
    leftSide: {
      display: 'flex',
      width: '48px',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#33333333',
      paddingBottom: '5px',
    },
    folderLeftSide: {
      display: 'flex',
      width: '48px',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#333333',
    },
    middleSide: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: '5px',
      justifyContent: '',
      flexGrow: 1,
    },
    rightSide: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'end',
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
    fileNameRow: {
      display: 'flex',
      gap: '15px',
      fontSize: '20px',
      marginLeft: '28px',
      marginRight: '10px',
    },
    fileDataText: {
      fontWeight: 'bold',
      marginLeft: '30px',
    },
    expires: {
      display: 'flex',
      alignItems: 'center',
      color: 'orange',
    },
    preview: {
      position: 'absolute',
      top: '0',
      left: '0',
    },
    icons: {
      display: 'flex',
      gap: '5px',
      paddingTop: '5px',
      paddingRight: '5px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fileTypeIcon: {
      marginTop: 'auto',
    },
  }),
)

interface Props {
  name: string
  type: 'video' | 'audio' | 'image' | 'document' | 'folder' | 'other'
  size: number
  hash: string
  expires: string
  preview?: boolean
  note?: boolean
  tag?: boolean
  shared?: 'me' | 'others'
  warning?: boolean
  addedToQueue?: boolean
}

const FileItem = (props: Props): ReactElement => {
  const classes = useStyles()
  const [showFileModal, setShowFileModal] = useState(false)

  return (
    <div>
      <div className={classes.container} onClick={() => setShowFileModal(true)}>
        <div className={props.type !== 'folder' ? classes.leftSide : classes.folderLeftSide}>
          {props.type !== 'folder' && props.preview ? <Preview /> : null}
          {props.type === 'folder' ? <FolderEnteringIcon /> : null}
          <div className={classes.fileTypeIcon}>
            <FileTypeIcon type={props.type} />
          </div>
        </div>
        <div className={classes.middleSide}>
          <div className={classes.fileNameRow}>
            {props.name}
            <DownloadQueueIcon added={props.addedToQueue} />
          </div>
          <div className={classes.flexDisplay}>
            <div className={classes.fileDataText}>
              {props.expires} - {props.size} GB
            </div>
          </div>
        </div>
        <div className={classes.rightSide}>
          <div className={classes.icons}>
            {props.note ? <NoteIcon /> : null}
            {props.tag ? <LabelIcon /> : null}
            {props.shared ? <SharedIcon sharedBy={props.shared} /> : null}
            {props.warning ? <NotificationSign text="!" /> : null}
          </div>
          <Edit />
        </div>
      </div>
      {showFileModal ? <FileModal modalDisplay={value => setShowFileModal(value)} /> : null}
    </div>
  )
}

export default FileItem
