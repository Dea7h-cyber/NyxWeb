import React from 'react'
import { ViewList, ViewComfy } from '@material-ui/icons'

// Config
import { classes, order } from 'config/Rankings'

// Helpers
import { getClassName } from 'helpers/Character'

export default ({ filter, setFilter, view, setView }) => {
  const updateClasses = event => {
    const target = Number(event.target.id)
    const classes = [...filter.class]
    const extraClass =
      target === 1 ? 0 : target === 17 ? 16 : target === 33 ? 32 : null

    if (classes.includes(target)) {
      classes.splice(
        classes.findIndex(c => c === target),
        1
      )

      if (extraClass !== null) {
        classes.splice(
          classes.findIndex(c => c === extraClass),
          1
        )
      }
    } else {
      classes.push(target)
      if (extraClass !== null) {
        classes.push(extraClass)
      }
    }

    setFilter({ ...filter, page: 1, class: classes })
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
                className={`button ${o.column === filter.order[0] &&
                  filter.order[1] &&
                  'active'}`}
                onClick={() =>
                  setFilter({ ...filter, page: 1, order: [o.column, true] })
                }>
                desc
              </div>
              <div
                className={`button ${o.column === filter.order[0] &&
                  !filter.order[1] &&
                  'active'}`}
                onClick={() =>
                  setFilter({ ...filter, page: 1, order: [o.column, false] })
                }>
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
          onChange={e =>
            setFilter({ ...filter, page: 1, name: e.target.value })
          }
          placeholder='search character'
        />
        <select
          onChange={e =>
            setFilter({ ...filter, page: 1, perPage: e.target.value })
          }>
          <option value={32}>per page</option>
          <option value={8}>8</option>
          <option value={16}>16</option>
          <option value={32}>32</option>
          <option value={64}>64</option>
        </select>
        <ViewList
          style={{ width: 31, height: 31, color: view ? 'green' : 'white' }}
          onClick={() => {
            setView(true)
            localStorage.nyxView = true
          }}
        />
        <ViewComfy
          style={{ width: 31, height: 31, color: !view ? 'green' : 'white' }}
          onClick={() => {
            setView(false)
            localStorage.nyxView = false
          }}
        />
      </div>
    </>
  )
}
