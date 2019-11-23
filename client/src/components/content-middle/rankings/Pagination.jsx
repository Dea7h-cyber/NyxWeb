import React from 'react'
import { Link } from 'react-router-dom'

export default ({
  passed: {
    search,
    setSearch,
    characters: { prev, next, totalPages, totalCharacters }
  }
}) => {
  const onClick = e => {
    const type = e.target.textContent
    if (
      (type === 'prev' && prev === search.page) ||
      (type === 'next' && next === search.page)
    ) {
      return e.preventDefault()
    }

    setSearch({
      ...search,
      page: type === 'next' ? search.page + 1 : search.page - 1
    })
  }

  return (
    <div className='pagination'>
      <Link
        to={`/rankings/${prev}`}
        onClick={onClick}
        className={`view btn ${prev === search.page && 'disabled'}`}>
        prev
      </Link>
      <span className='view'>
        {'page '}
        <strong>{search.page}</strong>
        {' of '}
        <strong>{totalPages}</strong>
      </span>
      <Link
        to={`/rankings/${next}`}
        onClick={onClick}
        className={`view btn ${next === search.page && 'disabled'}`}>
        next
      </Link>
      <span className='view total' style={{ float: 'right', margin: 0 }}>
        Total Characters <strong>{totalCharacters}</strong>
      </span>
    </div>
  )
}
