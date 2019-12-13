import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from 'components/reusables/Loading'
import Failed from 'components/reusables/Failed'
import Custom from 'components/reusables/Custom'
import Character from './Character'
import Pagination from './Pagination'
import SearchBoard from './SearchBoard'

// Config
import { perPage } from 'config/Rankings'

// Actions
import { fetchMany } from 'redux/actions/Rankings'

const Rankings = ({
  fetchMany,
  match: {
    params: { page }
  },
  Characters: { characters, failed }
}) => {
  const [loading, setLoading] = useState(characters ? false : true)
  const [displayChars, setDisplayChars] = useState([])
  const [totalChars, setTotalChars] = useState(0)
  const [view, setView] = useState(true)
  const [filter, setFilter] = useState({
    page: page ? Number(page) : 1,
    class: [0, 1, 16, 17, 32, 33, 48, 64],
    order: ['Resets', true],
    name: false,
    perPage,
    totalChars: 0
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await fetchMany()
      setLoading(false)
    }

    if (!characters) {
      fetchData()
    }
  }, [fetchMany, characters])

  useEffect(() => {
    const filterCharacters = () => {
      // Classes
      let filtered = [...characters].filter(c => filter.class.includes(c.Class))

      // Search by name
      if (filter.name !== false) {
        filtered = filtered.filter(c =>
          c.Name.match(new RegExp(filter.name, 'i'))
        )
      }

      // Order
      filtered = filtered.sort((a, b) =>
        filter.order[1]
          ? b[filter.order[0]] - a[filter.order[0]]
          : a[filter.order[0]] - b[filter.order[0]]
      )

      setTotalChars(filtered.length)

      // Page
      filtered.splice(0, (filter.page - 1) * filter.perPage)
      filtered.splice(filter.perPage)

      setDisplayChars(filtered)
    }

    if (characters) {
      filterCharacters()
    }
  }, [characters, filter])

  return loading ? (
    <Loading />
  ) : failed ? (
    <Failed />
  ) : characters.error ? (
    <Custom title='Not found' message={characters.error} />
  ) : characters.length < 1 ? (
    <Custom title='No characters' message='No characters found' />
  ) : (
    <div>
      <h1 className='content-title'>rankings</h1>
      <section className='content-body'>
        <div className='content padding'>
          <SearchBoard
            filter={filter}
            setFilter={setFilter}
            view={view}
            setView={setView}
          />
          <Pagination
            filter={filter}
            setFilter={setFilter}
            totalChars={totalChars}
          />
          {displayChars.length > 0 ? (
            <div className={view ? 'rankings-table' : 'rankings-grid'}>
              {displayChars.map((char, index) => (
                <Character
                  key={index}
                  page={filter.page}
                  perPage={filter.perPage}
                  char={char}
                  index={index}
                  view={view}
                />
              ))}
            </div>
          ) : (
            <div style={{ padding: 10 }}>No characters found</div>
          )}
          <Pagination
            filter={filter}
            setFilter={setFilter}
            totalChars={totalChars}
          />
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = state => ({
  Characters: state.Rankings.Characters
})

export default connect(mapStateToProps, { fetchMany })(Rankings)
