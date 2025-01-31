import { createStyles, makeStyles } from '@material-ui/core'

import type { ReactElement } from 'react'
import FileHome from './FileHome'
import FileBreadcrumb from './FileBreadcrumb'
import FileBackNavigation from './FileBackNavigation'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      paddingTop: '10px',
      paddingBottom: '10px',
      height: '65px',
      boxSizing: 'border-box',
      fontSize: '12px',
      display: 'flex',
      gap: '10px',
      justifyContent: 'left',
      alignItems: 'center',
    },
  }),
)

const FileNavigation = (): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <FileHome />
      <FileBreadcrumb />
      <FileBackNavigation />
    </div>
  )
}

export default FileNavigation
