import { createStyles, makeStyles, Tooltip } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'
import type { ReactElement } from 'react'
import VolumeIcon from './VolumeIcon'
import SwarmCheckedIcon from './SwarmCheckedIcon'
import NotificationSign from './NotificationSign'

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
      fontFamily: '"iAWriterMonoV", monospace',
      '&:hover': {
        backgroundColor: '#f0f0f0',
      },
    },
    flex: {
      display: 'flex',
    },
    absoluteLeft: {
      position: 'absolute',
      left: '15px',
    },
    absoluteRight: {
      position: 'absolute',
      right: '5px',
      top: '2px',
    },
  }),
)

interface Props {
  value: number
  notificationText?: string
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
        <div className={classes.flex}>
          <div className={classes.absoluteLeft}>
            <SwarmCheckedIcon color={clicked ? '#DE7700' : '#33333333'} />
          </div>
          <VolumeIcon color={clicked ? '#333333' : '#33333333'} />
          {props.notificationText ? (
            <div className={classes.absoluteRight}>
              <NotificationSign text={props.notificationText} />
            </div>
          ) : null}
        </div>
        <div>Vol.-{props.value}</div>
      </div>
    </Tooltip>
  )
}

export default Volume
