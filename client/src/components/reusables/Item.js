import React from 'react'
import { Tooltip } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import uuid from 'uuid/v4'

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

  const theme = createMuiTheme({
    overrides: {
      MuiTooltip: {
        tooltip: {
          backgroundColor: 'black'
        }
      }
    }
  })

  return (
    <MuiThemeProvider theme={theme}>
      <Tooltip title={<Options itemData={itemData} item={item} />}>
        <div style={style.container}>
          {options && options.image ? (
            <img
              src={`./images/items/${itemData.group}/${itemData.id}.gif`}
              alt={item.name}
              style={
                options.size && {
                  width: options.size * item.x - 2,
                  height: options.size * item.y - 2
                }
              }
            />
          ) : (
            `${item.name} ${itemData.level ? ' +' + itemData.level : ''}`
          )}
        </div>
      </Tooltip>
    </MuiThemeProvider>
  )
}

const Options = ({ item, itemData }) => {
  const style = {
    container: {
      padding: 5,
      fontSize: 14,
      // background: 'black',
      textAlign: 'center'
    },
    name: {
      ...nameColor(itemData),
      padding: 3,
      margin: 3,
      marginBottom: 15,
      fontSize: 16
    },
    durability: {
      padding: 3,
      margin: 3,
      marginBottom: 10
    },
    optionsBlock: {
      padding: 3,
      margin: 3,
      color: '#80b2ff'
    },
    luck: {
      color: '#80b2ff'
    },
    excellent: {
      marginTop: 10,
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
    <div style={style.name} key={uuid()}>
      {item.name} {itemData.level ? ' +' + itemData.level : ''}
    </div>
  )

  // Item Image
  view.push(
    <img
      key={uuid()}
      src={`./images/items/${itemData.group}/${itemData.id}.gif`}
      alt={item.name}
    />
  )

  // Item Durability
  view.push(
    <div style={style.durability} key={uuid()}>
      Durability: {itemData.durability}
    </div>
  )

  // Can equip
  if (item.class) {
    view.push(
      <div style={style.equip} key={uuid()}>
        {item.class.map((Class, key) => (
          <div key={key} style={{ padding: 2 }}>
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
        <div style={style.luck} key={uuid()}>
          {_Options.luck.map((opt, key) => (
            <div key={key}>{opt}</div>
          ))}
        </div>
      )
    }

    if (itemData.add) {
      opts.push(
        <div style={style.additional} key={uuid()}>
          {getAdd(itemData.add, item.options.additional)}
        </div>
      )
    }

    view.push(
      <div style={style.optionsBlock} key={uuid()}>
        {opts}
      </div>
    )
  }

  // Excellent Options
  if (excellent && itemData.excellent.find(opt => opt[1])) {
    view.push(
      <div style={style.excellent} key={uuid()}>
        {itemData.excellent.map((opt, key) =>
          opt[1] ? <div key={key}>{excellent[opt[0]]}</div> : ''
        )}
      </div>
    )
  }

  return <div style={style.container}>{view}</div>
}
