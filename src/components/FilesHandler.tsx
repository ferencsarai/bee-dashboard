import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import SearchBar from './SearchBar'
import FreeUp from './FreeUp'
import Sharing from './Sharing'
import Download from './Download'
import Selection from './Selection'
import Upload from './Upload'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      padding: '10px',
      backgroundColor: '#ffffff',
      fontSize: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flex: {
      display: 'flex',
    },
  }),
)

const FilesHandler = (): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.flex}>
        <SearchBar />
        <div className={classes.flex}>
          <FreeUp />
          <Sharing />
          <Download />
          <Selection />
        </div>
      </div>
      <div className={classes.flex}>
        <Upload />
      </div>
    </div>
  )
}

export default FilesHandler
