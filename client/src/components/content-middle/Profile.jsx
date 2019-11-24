import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../reusables/Loading'
import Failed from '../reusables/Failed'
import Custom from '../reusables/Custom'

// Actions
import { getOne } from '../../redux/actions/Character'

const Profile = ({ match, getOne }) => {
  const [loading, setLoading] = useState(true)
  const [character, setCharacter] = useState()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await getOne(match.params.name)
      setCharacter(response)
      setLoading(false)
    }

    fetchData()
  }, [getOne, match.params.name])

  return loading ? (
    <Loading />
  ) : !character ? (
    <Failed />
  ) : character.error ? (
    <Custom title='Not found' message={character.error} />
  ) : (
    <div>
      <h1 className='content-title'>{character.Name}'s profile</h1>
      <section className='content-body'>
        <div className='content padding'>
          <div className='rankings-table'>
            {character ? character.Name : 'No characters'}
          </div>
        </div>
      </section>
    </div>
  )
}

export default connect(null, { getOne })(Profile)
