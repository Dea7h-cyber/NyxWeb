import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import Loading from '../../../reusables/Loading'
import Failed from '../../../reusables/Failed'

// Actions
import { getUserCharacters } from '../../../../redux/actions/Character'

// Helpers
import { classToImage } from '../../../../helpers/Character'

const Characters = ({
  username,
  Characters: { characters, failed },
  getUserCharacters
}) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      await getUserCharacters()
      setLoading(false)
    })()
  }, [getUserCharacters])

  return loading ? (
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
            <Character char={characters.char1} />
            <Character char={characters.char2} />
            <Character char={characters.char3} />
            <Character char={characters.char4} />
            <Character char={characters.char5} />
          </div>
        </div>
      </section>
    </div>
  )
}

const Character = ({ char }) => {
  return (
    <Link to={char ? `/user/characters/${char.Name}` : '/user/characters'}>
      <div
        className={`character ${!char && 'empty'}`}
        style={{
          backgroundImage: `url('/images/classes/profile/${
            char ? classToImage(char.Class) : 'bk'
          }.png')`
        }}>
        <span className='shiner' />
        <span className='name'>{char ? char.Name : 'empty'}</span>
        {!char && <span className='cover' />}
        {char && (
          <span
            className={`status-circle ${char.status ? 'online' : 'offline'}`}
          />
        )}
      </div>
    </Link>
  )
}

const mapStateToProps = state => ({
  username: state.User.Login.username,
  Characters: state.UserCharacters
})

export default connect(mapStateToProps, { getUserCharacters })(Characters)
