import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from 'components/reusables/Loading'
import Failed from 'components/reusables/Failed'
import Custom from 'components/reusables/Custom'
import Character from './Character'
import Pagination from './Pagination'
import SearchBoard from './SearchBoard'

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
  const [filter, setFilter] = useState({
    page: page ? Number(page) : 1,
    class: [0, 1, 16, 17, 32, 33, 48, 64],
    order: [
      { name: 'Resets', column: 'Resets', type: true },
      { name: 'Level', column: 'cLevel', type: true },
      { name: 'Name', column: 'Name', type: false }
    ],
    name: false,
    perPage: 32
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
      let filtered = [...characters]

      // Classes
      filtered = filtered.filter(c => filter.class.includes(c.Class))

      setTotalChars(filtered.length)

      // Page
      filtered.splice(0, (filter.page - 1) * filter.perPage)
      filtered.splice(filter.perPage)

      console.log(filtered)

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
          <SearchBoard filter={filter} setFilter={setFilter} />
          <Pagination
            filter={filter}
            setFilter={setFilter}
            totalChars={totalChars}
          />
          <div className='rankings-table'>
            {displayChars.map((char, index) => (
              <Character
                key={index}
                page={filter.page}
                char={char}
                index={index}
              />
            ))}
          </div>
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
