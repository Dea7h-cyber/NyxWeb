import React, { useState } from 'react'
import { connect } from 'react-redux'

import { updateCharacterStats } from '../../../../../redux/actions/UserCharacter'

const AddStats = ({ selected, updateCharacterStats }) => {
  const [statsFields, setStatsFields] = useState({
    Strength: 0,
    Dexterity: 0,
    Vitality: 0,
    Energy: 0,
    Leadership: 0
  })

  const [statsCurrent, setStatsCurrent] = useState({
    Strength: selected.Strength,
    Dexterity: selected.Dexterity,
    Vitality: selected.Vitality,
    Energy: selected.Energy,
    Leadership: selected.Leadership
  })

  const [totalPoints, setTotalPoints] = useState(selected.LevelUpPoint)

  const onChange = e => {
    const value = Number([e.target.value])
    const totalSpentPoints =
      statsFields.Strength +
      statsFields.Dexterity +
      statsFields.Vitality +
      statsFields.Energy +
      statsFields.Leadership -
      statsFields[e.target.name] +
      value

    if (
      typeof value === 'number' &&
      selected.LevelUpPoint >= totalSpentPoints &&
      selected[e.target.name] + value <= 32767
    ) {
      setStatsFields({
        ...statsFields,
        [e.target.name]: value
      })

      setStatsCurrent({
        ...statsCurrent,
        [e.target.name]: selected[e.target.name] + value
      })

      setTotalPoints(selected.LevelUpPoint - totalSpentPoints)
    }
  }

  const saveStats = () => {
    const total = Object.values(statsFields).reduce(
      (prev, curr) => prev + curr,
      0
    )

    if (total > 0) {
      updateCharacterStats(selected.Name, statsFields)
    }
  }

  return (
    <div className='add-stats'>
      <div className='points-left'>
        Points left{' '}
        <span className='highlight'>{totalPoints.toLocaleString()}</span>
      </div>
      <div className='row'>
        <div className='left'>Strength</div>
        <div className='middle'>
          <input
            type='text'
            value={statsFields.Strength}
            onChange={onChange}
            name='Strength'
          />
        </div>
        <div className='right'>
          <span className='highlight'>
            {statsCurrent.Strength.toLocaleString()}
          </span>
        </div>
      </div>
      <div className='row'>
        <div className='left'>Agility</div>
        <div className='middle'>
          <input
            type='text'
            value={statsFields.Dexterity}
            onChange={onChange}
            name='Dexterity'
          />
        </div>
        <div className='right'>
          <span className='highlight'>
            {statsCurrent.Dexterity.toLocaleString()}
          </span>
        </div>
      </div>
      <div className='row'>
        <div className='left'>Vitality</div>
        <div className='middle'>
          <input
            type='text'
            value={statsFields.Vitality}
            onChange={onChange}
            name='Vitality'
          />
        </div>
        <div className='right'>
          <span className='highlight'>
            {statsCurrent.Vitality.toLocaleString()}
          </span>
        </div>
      </div>
      <div className='row'>
        <div className='left'>Energy</div>
        <div className='middle'>
          <input
            type='text'
            value={statsFields.Energy}
            onChange={onChange}
            name='Energy'
          />
        </div>
        <div className='right'>
          <span className='highlight'>
            {statsCurrent.Energy.toLocaleString()}
          </span>
        </div>
      </div>
      {selected.Class === 64 && (
        <div className='row'>
          <div className='left'>Command</div>
          <div className='middle'>
            <input
              type='text'
              value={statsFields.Leadership}
              onChange={onChange}
              name='Leadership'
            />
          </div>
          <div className='right'>
            <span className='highlight'>
              {statsCurrent.Leadership.toLocaleString()}
            </span>
          </div>
        </div>
      )}
      <div className='save'>
        <button onClick={saveStats}>SAVE STATS</button>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  selected: state.UserCharacters.selected
})

export default connect(mapStateToProps, { updateCharacterStats })(AddStats)
