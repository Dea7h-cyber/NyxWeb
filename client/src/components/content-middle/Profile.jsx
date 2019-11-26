import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../reusables/Loading'
import Failed from '../reusables/Failed'
import Custom from '../reusables/Custom'

// Actions
import { getOne } from '../../redux/actions/Character'

const Profile = ({
  match: {
    params: { name }
  },
  getOne,
  Profile: { character, failed }
}) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await getOne(name)
      setLoading(false)
    }

    fetchData()
  }, [getOne, name])

  return loading ? (
    <Loading />
  ) : failed ? (
    <Failed />
  ) : character.error ? (
    <Custom title='Not found' message={character.error} />
  ) : (
    <div>
      <h1 className='content-title'>{character.Name}'s profile</h1>
      <section className='content-body'>
        <div className='content padding'>
          <div className='rankings-table'>{character.Name}</div>
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = state => ({
  Profile: state.Rankings.Profile
})

export default connect(mapStateToProps, { getOne })(Profile)
