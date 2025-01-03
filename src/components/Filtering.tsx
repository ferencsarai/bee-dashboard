import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    tooltip: {
      fontSize: '7px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '9px',
      height: '10px',
      marginLeft: '5px',
      background: '#DE7700',
      color: 'white',
      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    },
    tooltipError: {
      backgroundColor: '#D00000',
    },
    tooltipFocused: {
      backgroundColor: '#DE7700',
    },
  }),
)

interface Props {
  isError?: boolean
  isFocused?: boolean
}

const Filtering = (props: Props): ReactElement => {
  const classes = useStyles()

  return (
    <div
      className={`${classes.tooltip} ${props.isError ? classes.tooltipError : ''} ${
        props.isFocused ? classes.tooltipFocused : ''
      }`}
    >
      !
    </div>
  )
}

export default Filtering
