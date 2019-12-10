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
  const [chars, setChars] = useState([])
  const [filter, setFilter] = useState({
    page: page || 1,
    class: [0, 1, 16, 17, 32, 33, 48, 64],
    order: [
      ['Resets', true],
      ['cLevel', true],
      ['Name', false]
    ],
    name: false
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
      const filtered = [...characters]

      // Page
      filtered.splice(0, filter.page - 1 * 32)
      filtered.splice(filter.page * 32)

      setChars(filtered)
    }

    if (characters) {
      filterCharacters()
    }
  }, [filter, characters])

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
          {/* <SearchBoard passed={{ search, setSearch }} /> */}
          <Pagination
            filter={filter}
            setFilter={setFilter}
            characters={characters}
          />
          <div className='rankings-table'>
            {chars.map((char, index) => (
              <Character key={index} page={page} char={char} index={index} />
            ))}
          </div>
          <Pagination
            filter={filter}
            setFilter={setFilter}
            characters={characters}
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
