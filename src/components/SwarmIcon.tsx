import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
      height: '16px',
    },
  }),
)

interface Props {
  color?: string
}

const SwarmIcon = (props: Props): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 0L13.9282 4V12L7 16L0.0717969 12V4L7 0Z" fill="#DE7700" />
      </svg>
    </div>
  )
}

export default SwarmIcon
