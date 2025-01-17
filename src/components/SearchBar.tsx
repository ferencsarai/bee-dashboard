import { createStyles, IconButton, InputBase, makeStyles, Paper } from '@material-ui/core'
import type { ReactElement } from 'react'
import SearchLineIcon from 'remixicon-react/SearchLineIcon'
import FindIcon from './FindIcon'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      width: '100%',
      height: '100%',
      gap: '15px',
      backgroundColor: '#ffffff',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '5px 15px',
      fontFamily: '"iAWriterMonoV", monospace',
      fontSize: '10px',
      flexGrow: 1,
    },
    flex: {
      display: 'flex',
      width: '100%',
      flexDirection: 'column',
    },
    input: {
      border: 'none',
      width: '100%',
      '&:focus': {
        outline: 'none',
      },
      fontFamily: '"iAWriterMonoV", monospace',
      fontSize: '14px',
    },
  }),
)

const SearchBar = (): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div className={classes.flex}>
        <label htmlFor="find-input">Find</label>
        <input className={classes.input} type="text" id="find-input" />
      </div>
      <FindIcon />
    </div>
  )
}

export default SearchBar
