import { createStyles, makeStyles, Slider } from '@material-ui/core'
import type { ReactElement } from 'react'
import { useState } from 'react'
import SwarmIcon from './SwarmIcon'
import { text } from 'stream/consumers'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: '16px',
      fontSize: '10px',
      fontFamily: '"iAWriterMonoV", monospace',
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
    boldSliderLabel: {
      fontWeight: 'bold',
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
    },
  }),
)

interface Props {
  color?: string
  type?: string
  marks?: { value: number }[]
  upperLabel?: string
  lowerLabel?: string
  upperValue?: number
  upperMetric?: string
  lowerValue?: number
  lowerMetric?: string
  min?: number
  max?: number
  step?: number
  value?: number
  defaultValue?: number
  metric?: string
  disabledRange?: { min: number; max: number }
}

const SliderFileManager = (props: Props): ReactElement => {
  const classes = useStyles()
  const [value, setValue] = useState(props.defaultValue ?? props.defaultValue ?? 0)

  const handleChange = (event: any, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setValue(newValue[0])
    } else {
      if (!isDisabled(newValue)) {
        setValue(newValue)
      }
    }
  }

  const handleErasureCoding = ['normal', 'strong', 'insane', 'paranoid']

  const handleValue = (value: number) => {
    if (props.type === 'text') {
      return handleErasureCoding[value - 1]
    } else {
      return value
    }
  }

  const isDisabled = (value: number) => {
    if (props.disabledRange) {
      return value > props.disabledRange.min && value < props.disabledRange.max
    }

    return false
  }

  return (
    <div className={classes.container}>
      <div>
        {props.upperLabel}{' '}
        <span className={classes.boldSliderLabel}>
          {handleValue(props.defaultValue ? props.defaultValue : value)}
          {props.upperMetric}
        </span>
      </div>
      <Slider
        step={props.step}
        marks={props.marks}
        min={props.min}
        max={props.max}
        value={value}
        valueLabelDisplay="off"
        disabled={isDisabled(value)}
        onChange={handleChange}
        classes={{
          mark: classes.mark,
          markLabel: classes.markLabel,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <div style={{ width: '135px', display: 'flex', justifyContent: 'right' }}>
          {props.lowerLabel}{' '}
          <span className={classes.boldSliderLabel}>
            {handleValue(value)}
            {props.lowerMetric}
          </span>
        </div>
      </div>
    </div>
  )
}

export default SliderFileManager
