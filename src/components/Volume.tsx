import { createStyles, makeStyles, Tooltip } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import type { ReactElement } from 'react'
import HardDrive2FillIcon from 'remixicon-react/HardDrive2FillIcon'

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

interface Props {
  value: number
}

const Volume = (props: Props): ReactElement => {
  const classes = useStyles()
  const [clicked, setClicked] = useState(false)

  return (
    <Tooltip
      title={
        <React.Fragment>
          <div>Expire date: 31/12/2025</div>
          <div>
            Free space: <strong>1.26 of 4.08GB</strong>
          </div>
        </React.Fragment>
      }
      placement="top"
      arrow
    >
      <div className={classes.container} onClick={() => setClicked(!clicked)}>
        <HardDrive2FillIcon size={20} className={clicked ? classes.black : classes.transparent} />
        <div>Vol.-{props.value}</div>
      </div>
    </Tooltip>
  )
}

export default Volume
