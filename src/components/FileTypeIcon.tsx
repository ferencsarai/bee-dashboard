import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import ImageLineIcon from 'remixicon-react/ImageLineIcon'
import VideoFillIcon from 'remixicon-react/VideoFillIcon'
import FileMusicFillIcon from 'remixicon-react/FileMusicFillIcon'
import DraftFillIcon from 'remixicon-react/DraftFillIcon'
import FolderFillIcon from 'remixicon-react/FolderFillIcon'
import File2FillIcon from 'remixicon-react/File2FillIcon'
import VideoIcon from './VideoIcon'
import MusicIcon from './MusicIcon'
import FolderIcon from './FolderIcon'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
    },
  }),
)

interface Props {
  type: 'video' | 'audio' | 'image' | 'document' | 'folder' | 'other'
}

const FileTypeIcon = (props: Props): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {props.type === 'video' && <VideoIcon />}
      {props.type === 'audio' && <MusicIcon />}
      {props.type === 'image' && <ImageLineIcon size="20" />}
      {props.type === 'document' && <DraftFillIcon size="20" />}
      {props.type === 'folder' && <FolderIcon />}
      {props.type === 'other' && <File2FillIcon size="20" />}
    </div>
  )
}

export default FileTypeIcon
