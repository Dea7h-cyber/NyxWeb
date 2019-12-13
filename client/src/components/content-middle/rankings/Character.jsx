import React from 'react'
import { Link } from 'react-router-dom'

// Helpers
import {
  pkNameColor,
  getClassImage,
  getClassName,
  calculateExp
} from 'helpers/Character'
import GuildMark from './GuildMark'

export default ({ page, perPage, char, index, view }) => {
  const rank = index + 1 + (page - 1) * perPage

  if (view) {
    return (
      <div className='character'>
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

        <div className='level'>
          {char.cLevel}
          <sup>{char.Resets}</sup>
        </div>

        <div className='class'>{getClassName(char.Class)}</div>

        <div className='zen'>{char.Money.toLocaleString()}</div>

        <div className='guild'>
          <span className='highlight'>
            {char.Guild ? (
              <Link to={`/guild/${char.Guild}`}>{char.Guild}</Link>
            ) : (
              '-'
            )}
          </span>
          <GuildMark passed={{ mark: char.GuildMark, size: 30 }} />
        </div>
      </div>
    )
  } else {
    return (
      <div className='character'>
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
            Zen: <span className='value'>{char.Money.toLocaleString()}</span>
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
}
