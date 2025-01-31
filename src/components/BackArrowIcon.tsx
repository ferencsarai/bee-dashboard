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

const BackArrowIcon = ({ color }: Props): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <svg width="12" height="18" viewBox="0 0 12 18" fill={color ? color : 'none'} xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0703 2L2.99924 9.07107L10.0703 16.1421" stroke="#333333" strokeWidth="3" />
      </svg>
    </div>
  )
}

export default BackArrowIcon
