import { createStyles, makeStyles, Slider } from '@material-ui/core'
import type { ReactElement } from 'react'
import { useState } from 'react'
import DownloadIcon from './DownloadIcon'
import { SwarmTextInput } from './SwarmTextInput'
import DestroyIcon from './DestroyIcon'
import SwarmIcon from './SwarmIcon'

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(5px)',
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    },
    modalContainer: {
      display: 'flex',
      gap: '20px',
      flexDirection: 'column',
      backgroundColor: '#EDEDED',
      padding: '20px',
      width: '552px',
      height: '696px',
    },
    modalHeader: {
      fontFamily: '"iAWriterMonoV", monospace',
      fontSize: '20px',
      fontWeight: 700,
      lineHeight: '26px',
    },
    modalContent: {
      fontFamily: '"iAWriterMonoV", monospace',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '28px',
    },
    flexCenter: {
      display: 'flex',
      gap: '20px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    volumenButtonContainer: {
      position: 'relative',
    },
    buttonElement: {
      backgroundColor: '#FFFFFF',
      width: '256px',
      height: '42px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: '#DE7700',
        color: '#FFFFFF',
      },
    },
    buttonElementNotificationSign: {
      position: 'absolute',
      right: '-25px',
      top: '0',
    },
    buttonNewVolume: {
      backgroundColor: '#DE7700',
      color: '#FFFFFF',
    },
    cancelButtonContainer: {
      display: 'flex',
      justifyContent: 'right',
    },
    tabPanel: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
      backgroundColor: '#F7F7F7',
      height: '42px',
      fontFamily: '"iAWriterMonoV", monospace',
    },
    tabPanelItem: {
      cursor: 'pointer',
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabPanelItemActive: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      color: 'black',
    },
    flex: {
      display: 'flex',
      gap: '20px',
    },
    inputContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '168px',
      backgroundColor: '#ffffff',
      justifyContent: 'left',
      alignItems: 'top',
      padding: '5px 15px',
      fontFamily: '"iAWriterMonoV", monospace',
      fontSize: '10px',
    },
    inputContainerName: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '42px',
      backgroundColor: '#ffffff',
      justifyContent: 'left',
      alignItems: 'top',
      padding: '5px 15px',
      fontFamily: '"iAWriterMonoV", monospace',
      fontSize: '10px',
    },
    textarea: {
      paddingLeft: '0px',
      height: '100%',
      resize: 'none',
      border: 'none',
      width: '100%',
      '&:focus': {
        outline: 'none',
      },
      fontFamily: '"iAWriterMonoV", monospace',
      fontSize: '14px',
    },
    infoContainer: {
      //   width: '129px',
      height: '42px',
      backgroundColor: '#F7F7F7',
      color: '#878787',
      padding: '5px 15px',
      fontSize: '14x',
    },
    downloadButtonContainer: {
      display: 'flex',
      padding: '40px 60px',
      flexDirection: 'column',
      width: '113px !important',
      height: '64px',
      justifyContent: 'center',
      alignItems: 'center',
      //   border: '20px solid #CFCDCD',
      backgroundColor: '#FFFFFF',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#DE7700',
        color: '#FFFFFF',
      },
    },
    copyIconContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      backgroundColor: '#FFFFFF',
      height: '53px',
      width: '53px',
    },
    mark: {
      height: 16,
      width: 2,
      backgroundColor: '#878787',
      marginTop: -7,
    },
    markLabel: {
      fontSize: '10px',
      color: '#333333',
      fontFamily: '"iAWriterMonoV", monospace',
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: 'red',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
  }),
)

interface VolumePropertiesModalProps {
  newVolume: boolean
  modalDisplay: (value: boolean) => void
}

const VolumePropertiesModal = (props: VolumePropertiesModalProps): ReactElement => {
  const classes = useStyles()
  const [isHoveredDestroy, setIsHoveredDestroy] = useState(false)
  const [isHoveredDownload, setIsHoveredDownload] = useState(false)

  const handleMouseEnterDestroy = () => {
    setIsHoveredDestroy(true)
  }

  const handleMouseLeaveDestroy = () => {
    setIsHoveredDestroy(false)
  }

  const handleMouseEnterDownload = () => {
    setIsHoveredDownload(true)
  }

  const handleMouseLeaveDownload = () => {
    setIsHoveredDownload(false)
  }

  const marks = [
    {
      value: 1,
      label: 'medium',
    },
    {
      value: 2,
      label: 'strong',
    },
    {
      value: 3,
      label: 'insane',
    },
    {
      value: 4,
      label: 'paranoid',
    },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: '1' }}>
      <div
        id="PropertiesContainer"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            {!props.newVolume ? (
              <div className={classes.infoContainer}>
                <div style={{ fontSize: '10px' }}>Volume</div>
                <div>MYVIDS</div>
              </div>
            ) : (
              <div style={{}}>
                <SwarmTextInput name="name" label="Volume name (max. 6 char)" required={false} />
              </div>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              backgroundColor: '#CFCDCD',
              padding: '20px',
              boxSizing: 'border-box',
            }}
          >
            <div
              className={classes.downloadButtonContainer}
              onMouseEnter={handleMouseEnterDestroy}
              onMouseLeave={handleMouseLeaveDestroy}
            >
              <DestroyIcon color={isHoveredDestroy ? '#FFFFFF' : '#333333'} />
              <div style={{ textAlign: 'center' }}>Destroy volume</div>
            </div>
            <div
              className={classes.downloadButtonContainer}
              onMouseEnter={handleMouseEnterDownload}
              onMouseLeave={handleMouseLeaveDownload}
            >
              <DownloadIcon color={isHoveredDownload ? '#FFFFFF' : '#333333'} />
              <div style={{ textAlign: 'center' }}>Download now</div>
            </div>
          </div>
        </div>

        <Slider
          step={1}
          marks={marks}
          valueLabelDisplay="on"
          min={1}
          max={4}
          classes={{ mark: classes.mark, markLabel: classes.markLabel }}
        />

        <div className={classes.cancelButtonContainer}>
          <div className={classes.buttonElement} style={{ width: '160px' }} onClick={() => props.modalDisplay(false)}>
            Cancel
          </div>
        </div>
      </div>
    </div>
  )
}

export default VolumePropertiesModal
