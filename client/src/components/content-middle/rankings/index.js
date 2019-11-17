import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'

// Components
import Character from './Character'
import Pagination from './Pagination'
import SearchBoard from './SearchBoard'

export default ({ match: { params } }) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const [characters, setCharacters] = useState({ data: [] })
  const [search, setSearch] = useState({
    page: 1,
    class: [1, 17, 33, 48, 64],
    order: ['Resets', 'desc'],
    name: false
  })

  const generateUrl = () => {
    const classes = search.class.join(',')
    const order = search.order.join(',')
    const name = search.name ? `&search=${search.name}` : ''

    return (
      `/api/characters?page=${search.page}&class=${classes}&order=${order}` +
      name
    )
  }

  const fetchCharacters = async () => {
    // setLoading(true)
    try {
      const response = await axios(generateUrl())
      response.data.data
        ? setCharacters(response.data)
        : setError("Couldn't load data")
    } catch (_) {
      setError("Couldn't load data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCharacters()
    // eslint-disable-next-line
  }, [search])

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
      <section className='content-body'>
        <div className='content padding'>
          {error ? (
            error
          ) : (
            <>
              <SearchBoard passed={{ search, setSearch }} />
              <Pagination passed={{ search, setSearch, characters }} />
              <div className='rankings-table'>
                {characters.data.length > 0
                  ? characters.data.map((char, index) => (
                      <Character
                        key={index}
                        passed={{
                          char,
                          index,
                          page: search.page,
                          perPage: characters.perPage
                        }}
                      />
                    ))
                  : 'No characters'}
              </div>
              <Pagination passed={{ search, setSearch, characters }} />
            </>
          )}
        </div>
      </section>
    </>
  )
}
