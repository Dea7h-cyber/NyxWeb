import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../reusables/Loading'
import Failed from '../../reusables/Failed'
import Custom from '../../reusables/Custom'
import Character from './Character.jsx'
import Pagination from './Pagination.jsx'
import SearchBoard from './SearchBoard.jsx'

// Actions
import { getMany } from '../../../redux/actions/Character'

const Rankings = ({
  getMany,
  match: {
    params: { page }
  }
}) => {
  const [loading, setLoading] = useState(true)
  const [characters, setCharacters] = useState()

  const [search, setSearch] = useState({
    page: page || 1,
    class: [1, 17, 33, 48, 64],
    order: ['Resets', 'desc'],
    name: false
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await getMany(search)
      setCharacters(response)
      setLoading(false)
    }

    fetchData()
  }, [getMany, search])

  return loading ? (
    <Loading />
  ) : !characters ? (
    <Failed />
  ) : characters.error ? (
    <Custom title='Not found' message={characters.error} />
  ) : (
    <div>
      <h1 className='content-title'>rankings</h1>
      <section className='content-body'>
        <div className='content padding'>
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
        </div>
      </section>
    </div>
  )
}

export default connect(null, { getMany })(Rankings)
