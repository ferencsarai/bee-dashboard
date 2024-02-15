import React, { useContext } from 'react'
import Box from '@material-ui/core/Box'
import ExpandableListItemKey from '../ExpandableListItemKey'
import { Context } from '../../providers/Bee'
import { Context as BalanceProvider } from '../../providers/WalletBalance'

export default function BuyxDai() {
  const { nodeAddresses } = useContext(Context)
  const { balance } = useContext(BalanceProvider)

  if (!nodeAddresses?.ethereum) {
    return <p>{'Could not load wallet...'}</p>
  }

  return (
    <Box mb={0.25}>
      <ExpandableListItemKey label="Send xDAI to this address" value={nodeAddresses.ethereum} expanded />
    </Box>
  )
}
