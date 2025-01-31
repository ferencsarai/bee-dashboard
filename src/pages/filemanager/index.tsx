import { createStyles, Divider, makeStyles } from '@material-ui/core'
import { ReactElement } from 'react'
import FileItem from '../../components/FileItem'
import FilesHandler from '../../components/FilesHandler'
import SharedWith from '../../components/SharedWith'
import FileNavigation from '../../components/FileNavigation'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    flexDisplay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
    },
  }),
)

export default function FileManager(): ReactElement {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <FilesHandler />
      {/* {elements} */}
      <FileNavigation />
      <div className={classes.flexDisplay}>
        <SharedWith text="For me" />
        <div style={{ flexGrow: 1 }}>
          <Divider />
        </div>
      </div>
      <FileItem
        name="ACT WorkShop part5 (2024-03-25 15_06 GMT+1).mp4"
        type="video"
        size={9456321.854}
        hash="Begin of the hash ... end of the hash"
        expires="31/09/2024"
        preview={true}
        note={true}
        tag={true}
        shared="me"
        warning={true}
        addedToQueue={true}
      />
      <FileItem
        name="ACT WorkShop part5 (2024-03-25 15_06 GMT+1).mp4"
        type="video"
        size={9456321.854}
        hash="Begin of the hash ... end of the hash"
        expires="31/09/2024"
        preview={true}
        shared="others"
        addedToQueue={false}
      />
      <FileItem
        name="ACT WorkShop part5 (2024-03-25 15_06 GMT+1).mp4"
        type="video"
        size={9456321.854}
        hash="Begin of the hash ... end of the hash"
        expires="31/09/2024"
        preview={false}
        addedToQueue={false}
      />
      <FileItem
        name="ACT WorkShop part5 (2024-03-25 15_06 GMT+1).mp4"
        type="folder"
        size={9456321.854}
        hash="Begin of the hash ... end of the hash"
        expires="31/09/2024"
        preview={true}
        note={true}
        tag={true}
        shared="me"
        warning={true}
        addedToQueue={true}
      />
      <FileItem
        name="ACT WorkShop part5 (2024-03-25 15_06 GMT+1).mp4"
        type="audio"
        size={9456321.854}
        hash="Begin of the hash ... end of the hash"
        expires="31/09/2024"
        preview={true}
        addedToQueue={false}
      />
      <FileItem
        name="ACT WorkShop part5 (2024-03-25 15_06 GMT+1).mp4"
        type="document"
        size={9456321.854}
        hash="Begin of the hash ... end of the hash"
        expires="31/09/2024"
        preview={true}
        addedToQueue={true}
      />
      <FileItem
        name="ACT WorkShop part5 (2024-03-25 15_06 GMT+1).mp4"
        type="other"
        size={9456321.854}
        hash="Begin of the hash ... end of the hash"
        expires="31/09/2024"
        preview={true}
        addedToQueue={true}
      />
    </div>
  )
}
