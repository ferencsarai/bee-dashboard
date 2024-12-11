import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import MoreFillIcon from 'remixicon-react/MoreFillIcon'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      backgroundColor: '#343434',
      color: '#ffffff',
      fontSize: '20px',
      height: '30px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80px',
      clipPath: 'polygon(0% calc(0% + 8px), calc(0% + 8px) 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
  }),
)

interface Props {
  text: string
}

const MoreOptions = (props: Props): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <MoreFillIcon />
    </div>
  )
}

export default MoreOptions
