import React from 'react'
import { Link } from 'react-router-dom'

export default ({
  passed: {
    page,
    loading,
    characters: { prev, next, totalPages }
  }
}) => (
  <div className='pagination'>
    {prev && (
      <Link to={loading ? '#' : `/rankings/${prev}`} className='view btn'>
        prev
      </Link>
    )}
    <span className='view'>
      {'page '}
      <strong>{page}</strong>
      {' of '}
      <strong>{totalPages}</strong>
    </span>
    {next && (
      <Link to={loading ? '#' : `/rankings/${next}`} className='view btn'>
        next
      </Link>
    )}
  </div>
)
