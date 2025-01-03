import { createStyles, makeStyles } from '@material-ui/core'
import { useState } from 'react'
import type { ReactElement } from 'react'
import ListCheckIcon from 'remixicon-react/ListCheckIcon'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      backgroundColor: '#ffffff',
      fontSize: '12px',
      display: 'flex',
      width: '65px',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    },
    black: {
      fill: '#000000',
    },
    transparent: {
      fill: '#00000040',
    },
  }),
)

const Grouping = (): ReactElement => {
  const classes = useStyles()
  const [clicked, setClicked] = useState(false)

  return (
    <div className={classes.container} onClick={() => setClicked(!clicked)}>
      <ListCheckIcon size={20} className={clicked ? classes.black : classes.transparent} />
      <div>Grouping</div>
    </div>
  )
}

export default Grouping
