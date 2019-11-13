import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import { Link } from 'react-router-dom'

// Components
import Character from './Character'

export default ({ match: { params } }) => {
  const [characters, setCharacters] = useState({ data: [] })
  const [page, setPage] = useState(1)
  const [error, setError] = useState(false)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const urlParams = {}
    new URLSearchParams(params).forEach((param, key) => {
      if (param !== 'undefined') {
        urlParams[key] = param
      }
    })

    setPage(Number(urlParams.page ? urlParams.page : 1))

    const url = '/api/characters?' + new URLSearchParams(urlParams)
    const fetchCharacters = async () => {
      try {
        const response = await axios(url)
        setCharacters(response.data)
      } catch (_) {
        setError("Couldn't load data")
      } finally {
        setLoader(false)
      }
    }

    fetchCharacters()
  }, [params])

  return loader ? (
    <Loader
      type='Triangle'
      width={50}
      height={50}
      style={{ margin: '15px', textAlign: 'center' }}
    />
  ) : (
    <>
      <h1 className='content-title'>rankings</h1>
      <section className='content-body padding'>
        <div style={{ textAlign: 'center', padding: '5px' }}>
          {characters.prev && (
            <Link to={`/rankings/${characters.prev}`}>prev</Link>
          )}
          page {page} of {characters.totalPages} of {characters.totalCharacters}{' '}
          characters
          {characters.next && (
            <Link to={`/rankings/${characters.next}`}>next</Link>
          )}
        </div>
        <div className='rankings-table'>
          {error
            ? error
            : characters.data.length > 0
            ? characters.data.map((char, index) => (
                <Character
                  key={index}
                  passed={{ char, index, page, perPage: characters.perPage }}
                />
              ))
            : 'No characters'}
        </div>
        <div style={{ textAlign: 'center', padding: '5px' }}>
          {characters.prev && (
            <Link to={`/rankings/${characters.prev}`}>prev</Link>
          )}
          page {page} of {characters.totalPages} of {characters.totalCharacters}{' '}
          characters
          {characters.next && (
            <Link to={`/rankings/${characters.next}`}>next</Link>
          )}
        </div>
      </section>
    </>
  )
}
