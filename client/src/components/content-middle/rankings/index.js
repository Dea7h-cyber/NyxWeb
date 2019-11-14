import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'

// Components
import Character from './Character'
import Pagination from './Pagination'

export default ({ match: { params } }) => {
  const [characters, setCharacters] = useState({ data: [] })
  const [page, setPage] = useState(1)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const urlParams = {}
    new URLSearchParams(params).forEach((param, key) => {
      if (param !== 'undefined') {
        urlParams[key] = param
      }
    })

    urlParams.page && urlParams.page !== page && setPage(Number(urlParams.page))

    const url = '/api/characters?' + new URLSearchParams(urlParams)
    const fetchCharacters = async () => {
      try {
        const response = await axios(url)
        response.data.data
          ? setCharacters(response.data)
          : setError("Couldn't load data")
      } catch (_) {
        setError("Couldn't load data")
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
    // eslint-disable-next-line
  }, [params])

  return loading ? (
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
        {error ? (
          error
        ) : (
          <>
            <Pagination passed={{ page, characters, loading }} />
            <div className='rankings-table'>
              {characters.data.length > 0
                ? characters.data.map((char, index) => (
                    <Character
                      key={index}
                      passed={{
                        char,
                        index,
                        page,
                        perPage: characters.perPage
                      }}
                    />
                  ))
                : 'No characters'}
            </div>
            <Pagination passed={{ page, characters, loading }} />
          </>
        )}
      </section>
    </>
  )
}
