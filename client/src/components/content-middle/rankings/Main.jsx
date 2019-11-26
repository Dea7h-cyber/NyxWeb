import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../../reusables/Loading'
import Failed from '../../reusables/Failed'
import Custom from '../../reusables/Custom'
import Character from './Character'
import Pagination from './Pagination'
import SearchBoard from './SearchBoard'

// Actions
import { getMany } from '../../../redux/actions/Character'

const Rankings = ({
  getMany,
  match: {
    params: { page }
  },
  Characters: { characters, failed }
}) => {
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState({
    page: page || 1,
    class: [1, 17, 33, 48, 64],
    order: ['Resets', 'desc'],
    name: false
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await getMany(search)
      setLoading(false)
    }

    fetchData()
  }, [getMany, search])

  return loading ? (
    <Loading />
  ) : failed ? (
    <Failed />
  ) : characters.error ? (
    <Custom title='Not found' message={characters.error} />
  ) : characters.data.length <= 0 ? (
    <Custom title='No characters' message='No characters found' />
  ) : (
    <div>
      <h1 className='content-title'>rankings</h1>
      <section className='content-body'>
        <div className='content padding'>
          <SearchBoard passed={{ search, setSearch }} />
          <Pagination passed={{ search, setSearch, characters }} />
          <div className='rankings-table'>
            {characters.data.map((char, index) => (
              <Character
                key={index}
                passed={{
                  char,
                  index,
                  page: search.page,
                  perPage: characters.perPage
                }}
              />
            ))}
          </div>
          <Pagination passed={{ search, setSearch, characters }} />
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = state => ({
  Characters: state.Rankings.Characters
})

export default connect(mapStateToProps, { getMany })(Rankings)
