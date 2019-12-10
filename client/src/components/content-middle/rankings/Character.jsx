import React from 'react'
import { Link } from 'react-router-dom'

// Helpers
import {
  pkNameColor,
  getClassImage,
  amountTransform,
  calculateExp
} from 'helpers/Character'
import GuildMark from './GuildMark'

export default ({ page, char, index }) => {
  const rank = index + 1 + (page - 1) * 32

  const charStyle = {
    // boxShadow: char.status
    //   ? '0 0 5px rgba(0, 204, 0, 0.3)'
    //   : '0 0 5px rgba(204, 51, 0, 0.3)'
  }

  return (
    <div className='character' style={charStyle}>
      <div className='name'>
        {rank}.&nbsp;
        <Link to={`/profile/${char.Name}`}>
          {pkNameColor({
            name: char.Name,
            pkCount: char.PkCount,
            position: rank
          })}
        </Link>
      </div>

      <GuildMark passed={{ mark: char.GuildMark, size: 30 }} />

      <div className='image'>
        <img src={getClassImage(char.Class)} alt={char.Class} />
        <div
          className={`status-circle ${char.status ? 'online' : 'offline'}`}
        />
      </div>
      <div
        className='info'
        style={{ background: char.status ? '#2e3c1780' : 'rgb(27, 23, 23)' }}>
        <div className='row'>
          Resets: <span className='value'>{char.Resets}</span>
        </div>
        <div className='row'>
          Level: <span className='value'>{char.cLevel}</span>
        </div>
        <div className='row'>
          Zen: <span className='value'>{amountTransform(char.Money)}</span>
        </div>
        <div className='row'>
          Guild:{' '}
          <span className='value'>
            {char.Guild ? (
              <Link to={`/guild/${char.Guild}`}>{char.Guild}</Link>
            ) : (
              '-'
            )}
          </span>
        </div>
        <div>
          <div className='progress'>
            <div
              className='inside'
              style={{
                width: `${calculateExp(char.cLevel, char.Experience)}%`
              }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}
