import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import { useState } from 'react'
import SortAscIcon from 'remixicon-react/SortAscIcon'
import SortDescIcon from 'remixicon-react/SortDescIcon'

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
    dropdown: {
      border: '1px solid #959595',
      backgroundColor: '#ffffff',
      padding: '10px',
      position: 'absolute',
      top: '100%',
      zIndex: 1,
      width: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '5px',
      borderRadius: '5px',
    },
  }),
)

interface Props {
  order: 'asc' | 'desc'
  onClick: () => void
}

const Order = (props: Props): ReactElement => {
  const classes = useStyles()
  const [clicked, setClicked] = useState(false)

  return (
    <div className={classes.container} onClick={() => setClicked(!clicked)}>
      {props.order === 'asc' ? <SortAscIcon size={20} /> : <SortDescIcon size={20} />}
      <div>Order</div>
      {clicked ? (
        <div className={classes.dropdown}>
          <div>Alphabet Inc.</div>
          <div>Alphabet Dec.</div>
          <div>Size Inc.</div>
          <div>Size Dec.</div>
          <div>Date Inc.</div>
          <div>Date Dec.</div>
        </div>
      ) : null}
    </div>
  )
}

export default Order
