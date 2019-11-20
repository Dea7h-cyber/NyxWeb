import React from 'react'
import { Tooltip } from '@material-ui/core'

// Helpers
import { hexDecode, nameColor } from '../../helpers/Items'
import { getClassName } from '../../helpers/Character'
import Items from '../../config/items/List'
import _Options from '../../config/items/Options'

export default ({ hex, options }) => {
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
        {options && options.image ? (
          <img
            src={`./images/items/${itemData.group}/${itemData.id}.gif`}
            alt={item.name}
          />
        ) : (
          `${item.name} ${itemData.level ? ' +' + itemData.level : ''}`
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
      margin: 3,
      fontSize: 16
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
    },
    equip: {
      backgroundColor: '#820909',
      padding: 3
    }
  }

  const excellent = item.options.excellent
    ? _Options[item.options.excellent]
    : false

  const getAdd = (add, type) => {
    let result = ''
    switch (type) {
      case 'rec':
        result = add
        break
      default:
        result = add * 4
    }

    return _Options.additional[item.options.additional] + ` +${result}`
  }

  // Declare options view
  const view = []

  // Item name
  view.push(
    <div style={style.name} key={1199}>
      {item.name} {itemData.level ? ' +' + itemData.level : ''}
    </div>
  )

  // Item Image
  view.push(
    <img
      key={1669}
      src={`./images/items/${itemData.group}/${itemData.id}.gif`}
      alt={item.name}
    />
  )

  // Item Durability
  view.push(
    <div style={style.durability} key={1976}>
      Durability: {itemData.durability}
    </div>
  )

  // Can equip
  if (item.class) {
    view.push(
      <div style={style.equip} key={196}>
        {item.class.map((Class, key) => (
          <div key={key + 777} style={{ padding: 2 }}>
            Can be equipped by {getClassName(Class)}
          </div>
        ))}
      </div>
    )
  }

  // Luck and Add
  if (itemData.luck || itemData.add) {
    const opts = []

    if (itemData.luck) {
      opts.push(
        <div style={style.luck} key={1912}>
          {_Options.luck.map((opt, key) => (
            <div key={key + 999}>{opt}</div>
          ))}
        </div>
      )
    }

    if (itemData.add) {
      opts.push(
        <div style={style.additional} key={191}>
          {getAdd(itemData.add, item.options.additional)}
        </div>
      )
    }

    view.push(
      <div style={style.optionsBlock} key={1989}>
        {opts}
      </div>
    )
  }

  // Excellent Options
  if (excellent && itemData.excellent.find(opt => opt)) {
    view.push(
      <div style={style.excellent} key={199}>
        {itemData.excellent.map((opt, key) =>
          opt[1] ? <div key={key + 111}>{excellent[opt[0]]}</div> : ''
        )}
      </div>
    )
  }

  return <div style={style.container}>{view}</div>
}
