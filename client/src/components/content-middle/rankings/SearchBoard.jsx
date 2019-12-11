import React, { useState } from 'react'
import { classes, order } from 'config/Rankings'

// Helpers
import { getClassName } from 'helpers/Character'

export default ({ filter, setFilter }) => {
  const updateClasses = event => {
    const target = [Number(event.target.id)]
    let classes = [...filter.class]

    if (target[0] === 1 || target[0] === 17 || target[0] === 33) {
      target.push(target[0] === 17 ? 16 : target[0] === 33 ? 32 : 0)
    }

    const indexes = []

    if (target[1]) {
      indexes.push(classes.findIndex(c => c === target[1]))
    }
    indexes.push(classes.findIndex(c => c === target[0]))

    if (indexes[0] !== -1) {
      classes.splice(indexes[0], target.length > 1 ? 2 : 1)
    } else {
      classes.push(target[0])
    }

    if (target.length > 1 && indexes[0] === -1) {
      classes.push(target[0] === 17 ? 16 : target[0] === 33 ? 32 : 0)
    }

    setFilter({ ...filter, class: classes })
  }

  return (
    <>
      <div className='search-bar classes'>
        {classes.map((c, i) => {
          return (
            <label key={i} className='row' htmlFor={c}>
              <input
                type='checkbox'
                id={c}
                onChange={updateClasses}
                checked={filter.class.includes(c)}
              />
              {getClassName(c)}
            </label>
          )
        })}
      </div>
      <div className='search-bar sort'>
        {order.map((o, i) => (
          <div className='row' key={i}>
            {o.name}
            <div className='buttons-group'>
              <div
                className={`button ${o.type && 'active'}`}
                onClick={() => console.log(o.type)}>
                desc
              </div>
              <div
                className={`button ${!o.type && 'active'}`}
                onClick={() => console.log(o.type)}>
                asc
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='search-bar byName'>
        <input
          type='text'
          value={filter.name || ''}
          onChange={e => setFilter({ ...filter, name: e.target.value })}
          placeholder='search character'
        />
      </div>
    </>
  )
}
