import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
    },
  }),
)

interface Props {
  color?: string
}

const HomeIcon = ({ color }: Props): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 17V11H12V17H17V9H20L10 0L0 9H3V17H8Z" fill={color ? color : '#333333'} />
      </svg>
    </div>
  )
}

export default HomeIcon
