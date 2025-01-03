import { createStyles, makeStyles } from '@material-ui/core'
import type { ReactElement } from 'react'
import EyeFillIcon from 'remixicon-react/EyeFillIcon'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      backgroundColor: '#343434',
      color: '#ffffff',
      fontSize: '20px',
      height: '20px',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '30px',
      clipPath: 'polygon(0% 0%, 100% 0%, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0% 100%)',
      position: 'absolute',
      top: '0',
      left: '0',
    },
  }),
)

const Preview = (): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <EyeFillIcon size="18" />
    </div>
  )
}

export default Preview
