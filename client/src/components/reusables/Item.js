import React from 'react'
import { Tooltip } from '@material-ui/core'

// Helpers
import { hexDecode, nameColor } from '../../helpers/Items'
import Items from '../../config/items/List'
import _Options from '../../config/items/Options'

export default ({ hex, size, options }) => {
  const itemData = hexDecode(hex)
  const item = Items[itemData.group].items[itemData.id]

  const style = {
    container: {
      ...nameColor(itemData),
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
          `${item.name} ${itemData.level && ' +' + itemData.level}`
        )}
      </div>
    </Tooltip>
  )
}

const Options = ({ item, itemData }) => {
  const style = {
    container: {
      padding: 5,
      fontSize: 14,
      background: 'black',
      textAlign: 'center'
    },
    name: {
      ...nameColor(itemData),
      padding: 3,
      margin: 3
    },
    durability: {
      padding: 3,
      margin: 3
    },
    optionsBlock: {
      padding: 3,
      margin: 3,
      marginBottom: 6,
      color: '#80b2ff'
    },
    luck: {
      color: '#80b2ff'
    },
    excellent: {
      color: '#80b2ff'
    }
  }

  const excellent = item.options.excellent
    ? _Options[item.options.excellent]
    : false

  const getAdd = (add, type) => {
    // _Options.additional[item.options.additional]
    switch (type) {
      case 'dmg':
      case 'deff':
      case 'wiz':
        return add * 4
      case 'rec':
        return add
      default:
        return add * 4
    }
  }

  return (
    <div style={style.container}>
      <div style={style.name}>
        {item.name} {itemData.level && ' +' + itemData.level}
      </div>
      <div style={style.durability}>Durability: {itemData.durability}</div>
      {(itemData.luck || itemData.add) && (
        <div style={style.optionsBlock}>
          {itemData.luck && (
            <div style={style.luck}>
              {_Options.luck.map((opt, key) => (
                <div key={key}>{opt}</div>
              ))}
            </div>
          )}
          {itemData.add && (
            <div style={style.additional}>
              {getAdd(itemData.add, item.options.additional)}
            </div>
          )}
        </div>
      )}
      {excellent && (
        <div style={style.excellent}>
          {itemData.excellent.map(
            (opt, key) => opt[1] && <div key={key}>{excellent[opt[0]]}</div>
          )}
        </div>
      )}
    </div>
  )
}
