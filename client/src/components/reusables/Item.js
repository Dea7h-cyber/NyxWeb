import React from 'react'
import { Tooltip } from '@material-ui/core'

// Helpers
import { hexDecode } from '../../helpers/Items'
import Items from '../../config/items/List.json'

export default ({ hex, size, options }) => {
  const itemData = hexDecode(hex)
  const item = Items[itemData.group].items[itemData.id]

  const style = {
    container: {
      display: 'inline-block'
    }
  }

  return (
    <Tooltip title={<Options itemData={itemData} item={item} />}>
      <div style={style.container}>
        {options.image ? (
          <img
            src={`./images/items/${itemData.group}/${itemData.id}.gif`}
            alt={item.name}
          />
        ) : (
          item.name
        )}
      </div>
    </Tooltip>
  )
}

const Options = ({ item, itemData }) => {
  return (
    <div style={{ padding: 5, fontSize: 14, background: 'black' }}>
      <div
        style={{
          color: itemData.excellent.find(opt => opt)
            ? 'green'
            : itemData.level < 7
            ? 'lightblue'
            : 'gold'
        }}>
        {item.name} {itemData.level && ' +' + itemData.level}
      </div>
      <div>
        excellent: {itemData.excellent[0]} {itemData.excellent[1]}{' '}
        {itemData.excellent[2]} {itemData.excellent[3]} {itemData.excellent[4]}{' '}
        {itemData.excellent[5]} {itemData.excellent[6]}
      </div>
    </div>
  )
}
