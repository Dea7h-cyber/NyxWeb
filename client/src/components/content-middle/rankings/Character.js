import React from 'react'
import { Link } from 'react-router-dom'

// Helpers
import {
  pkNameColor,
  getClassImage,
  amountTransform,
  calculateExp
} from '../../../helpers/Character'

export default ({ passed: { char, index, page, perPage } }) => (
  <div className='character'>
    <div className='name'>
      {index + 1 + (page - 1) * perPage}.&nbsp;
      <Link to={`/profile/${char.Name}`}>
        {pkNameColor(char.Name, char.PkCount)}
      </Link>
    </div>
    <div className='image'>
      <img src={getClassImage(char.Class)} alt={char.Class} />
    </div>
    <div className='info'>
      <div>
        Resets: <span className='value'>{char.Resets}</span>
      </div>
      <div>
        Level: <span className='value'>{char.cLevel}</span>
      </div>
      <div>
        Zen: <span className='value'>{amountTransform(char.Money)}</span>
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
    <div
      className={`status-circle ${char.status ? 'online' : 'offline'}`}></div>
  </div>
)
