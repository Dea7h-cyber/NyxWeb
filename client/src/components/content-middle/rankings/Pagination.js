import React from 'react'
import { Link } from 'react-router-dom'

export default ({
  passed: {
    page,
    characters: { prev, next, totalPages, totalCharacters }
  }
}) => (
  <div className='pagination'>
    <Link
      to={`/rankings/${prev}`}
      onClick={e => prev === page && e.preventDefault()}
      className={`view btn ${prev === page && 'disabled'}`}>
      prev
    </Link>
    <span className='view'>
      {'page '}
      <strong>{page}</strong>
      {' of '}
      <strong>{totalPages}</strong>
    </span>
    <Link
      to={`/rankings/${next}`}
      onClick={e => next === page && e.preventDefault()}
      className={`view btn ${next === page && 'disabled'}`}>
      next
    </Link>
    <span className='view total' style={{ float: 'right', margin: 0 }}>
      Total Characters <strong>{totalCharacters}</strong>
    </span>
  </div>
)
