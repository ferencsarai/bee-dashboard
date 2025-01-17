import { createStyles, Divider, makeStyles, Tooltip } from '@material-ui/core'

import { useState } from 'react'
import type { ReactElement } from 'react'
import SearchBar from './SearchBar'
import FreeUp from './FreeUp'
import Sharing from './Sharing'
import Download from './Download'
import Selection from './Selection'
import Upload from './Upload'
import Grouping from './Grouping'
import ForMe from './ForMe'
import Volume from './Volume'
import Manage from './Manage'
import Order from './Order'

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      position: 'relative',
      paddingTop: '10px',
      paddingBottom: '10px',
      height: '65px',
      boxSizing: 'border-box',
      // backgroundColor: '#ffffff',
      fontSize: '12px',
      display: 'flex',
      gap: '10px',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flex: {
      display: 'flex',
      height: '100%',
    },
    options: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: '10px',
      paddingRight: '10px',
    },
  }),
)

const FilesHandler = (): ReactElement => {
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const classes = useStyles()

  const handleOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }

  return (
    <div className={classes.container}>
      <SearchBar />

      <div className={classes.flex}>
        <Grouping />
        <ForMe />
        {/* <FreeUp /> */}
        <Volume value={1} />
        <Volume value={2} />
        <Volume value={3} />
        <Volume value={4} />
        <Volume value={5} notificationText="!" />
        <Manage />
      </div>
      <div className={classes.flex}>
        <Download notificationText="123" />
        <Upload />
        <Order order={order} onClick={handleOrder} />
      </div>
    </div>
  )
}

export default FilesHandler
