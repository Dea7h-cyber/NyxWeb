import React from 'react'
import { Link } from 'react-router-dom'

// Helpers
import { getClassName, getClassImage } from '../../../helpers/Character'

export default ({ char: { index, Name, Class, Resets, cLevel } }) => (
  <div className="character">
    <div className="name">
      {index + 1}.&nbsp;
      <Link to={`/profile/${Name}`}>{Name}</Link>
    </div>
    <div className="image">
      <img src={getClassImage(Class)} alt={Class} />
    </div>
    <div className="info">
      <div>{getClassName(Class)}</div>
      <div>Resets: {Resets}</div>
      <div>Level: {cLevel}</div>
    </div>
  </div>
)
