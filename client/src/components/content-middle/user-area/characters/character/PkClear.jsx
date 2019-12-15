import React from 'react'
import { connect } from 'react-redux'

import { clearCharacter } from 'redux/actions/UserCharacter'

import config from 'config/characters/pkClear'

const AddStats = ({ selected, clearCharacter }) => {
  const clearKills = () => {
    clearCharacter(selected.Name)
  }

  return (
    <div style={{ padding: 10, width: '100%' }}>
      <div style={{ marginBottom: 10, fontSize: 16, color: 'orange' }}>
        <span className='highlight'>{selected.Name}</span> you have{' '}
        <span className='highlight'>{selected.PkCount}</span> kills. To clear
        them will cost you{' '}
        <span className='highlight'>
          {(config.mode === 1
            ? config.cost
            : selected.PkCount * config.cost
          ).toLocaleString()}
        </span>{' '}
        zen
      </div>
      <button onClick={clearKills}>CLEAR KILLS</button>

      <div
        style={{
          marginTop: 30,
          padding: 10,
          color: 'orange',
          fontSize: 14,
          backgroundColor: '#121212',
          border: '1px solid #121212',
          borderRadius: 5,
          width: '100%'
        }}>
        <div>
          Clearing PK Status costs{' '}
          <span className='highlight'>{config.cost.toLocaleString()}</span>{' '}
          {config.mode === 1
            ? 'no matter the amount of kills you get'
            : 'per kill'}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  selected: state.UserCharacters.selected
})

export default connect(mapStateToProps, { clearCharacter })(AddStats)
