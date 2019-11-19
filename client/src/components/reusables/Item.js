import React from 'react'
import { Tooltip } from '@material-ui/core'

// Helpers
import { hexDecode } from '../../helpers/Items'
import Items from '../../config/Items'

export default ({ hex, size, options }) => {
  const item = hexDecode(hex)
  const itemData = Items[item.group][item.id]

  return (
    <div>
      id: {item.id}, group: {item.group}
      <Tooltip title={<Options item={item} />} interactive>
        <button>{itemData}</button>
      </Tooltip>
    </div>
  )
}

const Options = ({ item }) => {
  return (
    <div style={{ padding: 5, fontSize: 14 }}>
      <div>
        item options: id: {item.id} group: {item.group}
      </div>
      <div>
        excellent: {item.excellent[0]} {item.excellent[1]} {item.excellent[2]}{' '}
        {item.excellent[3]} {item.excellent[4]} {item.excellent[5]}{' '}
        {item.excellent[6]}
      </div>
    </div>
  )
}
