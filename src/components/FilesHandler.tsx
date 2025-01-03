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
      padding: '10px',
      height: '68px',
      boxSizing: 'border-box',
      backgroundColor: '#ffffff',
      fontSize: '12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flex: {
      display: 'flex',
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
      <Grouping />
      <ForMe />
      {/* <FreeUp /> */}
      <Volume value={1} />
      <Volume value={2} />
      <Volume value={3} />
      <Volume value={4} />
      <Volume value={5} />
      <Manage />
      <Divider orientation="vertical" />
      {/* <Sharing />
          <Download />
          <Selection /> */}
      <Download />
      <Upload />
      <Order order={order} onClick={handleOrder} />
    </div>
  )
}

export default FilesHandler
