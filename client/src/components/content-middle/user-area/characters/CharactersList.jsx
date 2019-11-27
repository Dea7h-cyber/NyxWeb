import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

// Components
import Custom from '../../../reusables/Custom'
import Loading from '../../../reusables/Loading'
import Failed from '../../../reusables/Failed'
import CharacterCard from '../../../reusables/CharacterCard'

// Actions
import { getUserCharacters } from '../../../../redux/actions/UserCharacter'

const Characters = ({
  username,
  Characters: { characters, failed },
  getUserCharacters
}) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const reFetch = async () => {
      await getUserCharacters()
      setLoading(false)
    }

    if (username) {
      reFetch()
    }
  }, [username, getUserCharacters])

  return !username ? (
    <Custom
      title='not authorized'
      message='You are not authorized. Please login and try again.'
    />
  ) : loading ? (
    <Loading />
  ) : failed ? (
    <Failed />
  ) : (
    <div>
      <h1 className='content-title'>{username}'s characters</h1>
      <section className='content-body padding'>
        <div className='characters-list'>
          <div className='title'>Choose your character</div>
          <div className='list'>
            {characters.map((char, key) => (
              <CharacterCard key={key} char={char} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = state => ({
  username: state.User.Login.username,
  Characters: state.UserCharacters
})

export default connect(mapStateToProps, { getUserCharacters })(Characters)
