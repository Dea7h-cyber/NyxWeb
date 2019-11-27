import React from 'react'
import { Link } from 'react-router-dom'

// Helpers
import { classToImage } from '../../helpers/Character'

export default ({ char }) => (
  <Link to={char ? `/user/characters/${char.Name}` : '/user/characters'}>
    <div
      className={`character-card ${!char && 'empty'}`}
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
