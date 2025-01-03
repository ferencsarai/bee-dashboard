import { createStyles, IconButton, InputBase, makeStyles, Paper } from '@material-ui/core'
import type { ReactElement } from 'react'
import SearchLineIcon from 'remixicon-react/SearchLineIcon'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      // padding: '10px',
      backgroundColor: '#ffffff',
      fontSize: '12px',
      display: 'flex',
      justifyContent: 'center',
    },
  }),
)

const SearchBar = (): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Paper component="form" style={{ paddingLeft: '8px', display: 'flex', alignItems: 'center' }}>
        <InputBase placeholder="Search" inputProps={{ 'aria-label': 'search' }} />
        <IconButton type="button" aria-label="search">
          <SearchLineIcon />
        </IconButton>
      </Paper>
    </div>
  )
}

export default SearchBar
