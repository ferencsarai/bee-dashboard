import { createStyles, makeStyles } from '@material-ui/core'

import type { ReactElement } from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      fontFamily: '"iAWriterMonoV", monospace',
      fontSize: '20px',
      lineHeight: '26px',
      color: '#333333',
    },
  }),
)

const FileBreadcrumb = (): ReactElement => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {' '}
      / ... / Previous folder / <span style={{ color: '#DE7700' }}>Active folder</span>
    </div>
  )
}

export default FileBreadcrumb
