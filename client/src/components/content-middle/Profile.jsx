import React, { useEffect } from 'react'
import { connect } from 'react-redux'

// Components
import Loading from '../reusables/Loading'
import Failed from '../reusables/Failed'
import Custom from '../reusables/Custom'

// Actions
import { getOne } from '../../redux/actions/Character'

const Profile = ({
  match,
  Profile: { character, loading, failed },
  getOne
}) => {
  useEffect(() => {
    getOne(match.params.name)
  }, [getOne, match.params.name])

  return loading ? (
    <Loading />
  ) : failed ? (
    <Failed />
  ) : character.error ? (
    <Custom title='Not found' message={character.error} />
  ) : (
    <>
      <h1 className='content-title'>{character.Name}'s profile</h1>
      <section className='content-body'>
        <div className='content padding'>
          <div className='rankings-table'>
            {character ? character.Name : 'No characters'}
          </div>
        </div>
      </section>
    </>
  )
}

const mapStateToProps = state => ({
  Profile: state.Profile
})

export default connect(mapStateToProps, { getOne })(Profile)
