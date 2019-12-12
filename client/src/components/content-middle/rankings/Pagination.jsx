import React from 'react'
import { Link } from 'react-router-dom'

export default ({ filter, setFilter, totalChars }) => {
  const totalPages = Math.ceil(totalChars / filter.perPage)

  const onClick = (event, type) => {
    if ((type && filter.page >= totalPages) || (!type && filter.page <= 1)) {
      return event.preventDefault()
    }

    setFilter({
      ...filter,
      page: type ? filter.page + 1 : filter.page - 1
    })
  }

  return (
    <div className='pagination'>
      <Link
        to={`/rankings/${filter.page - 1}`}
        onClick={e => onClick(e, false)}
        className={`view btn ${filter.page <= 1 && 'disabled'}`}>
        prev
      </Link>
      <span className='view'>
        {'page '}
        <strong>{filter.page}</strong>
        {' of '}
        <strong>{totalPages}</strong>
      </span>
      <Link
        to={`/rankings/${filter.page + 1}`}
        onClick={e => onClick(e, true)}
        className={`view btn ${filter.page >= totalPages && 'disabled'}`}>
        next
      </Link>
      <span className='view total' style={{ float: 'right', margin: 0 }}>
        Total Characters <strong>{totalChars}</strong>
      </span>
    </div>
  )
}
