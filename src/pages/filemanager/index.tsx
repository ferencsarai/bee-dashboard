import { createStyles, makeStyles } from '@material-ui/core'
import { ReactElement } from 'react'
import FileItem from '../../components/FileItem'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
  }),
)

export default function FileManager(): ReactElement {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <FileItem
        name="File name"
        size={9456321.854}
        hash="Begin of the hash ... end of the hash"
        expires="31 / 09 / 2024"
      />
      <FileItem
        name="File name"
        size={9456321.854}
        hash="Begin of the hash ... end of the hash"
        expires="31 / 09 / 2024"
      />
      <FileItem
        name="File name"
        size={9456321.854}
        hash="Begin of the hash ... end of the hash"
        expires="31 / 09 / 2024"
      />
      <FileItem
        name="File name"
        size={9456321.854}
        hash="Begin of the hash ... end of the hash"
        expires="31 / 09 / 2024"
      />
      <FileItem
        name="File name"
        size={9456321.854}
        hash="Begin of the hash ... end of the hash"
        expires="31 / 09 / 2024"
      />
      <FileItem
        name="File name"
        size={9456321.854}
        hash="Begin of the hash ... end of the hash"
        expires="31 / 09 / 2024"
      />
      <FileItem
        name="File name"
        size={9456321.854}
        hash="Begin of the hash ... end of the hash"
        expires="31 / 09 / 2024"
      />
    </div>
  )
}
