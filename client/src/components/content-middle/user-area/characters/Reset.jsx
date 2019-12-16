import React from 'react'
import { connect } from 'react-redux'

import { resetCharacter } from 'redux/actions/UserCharacter'

import config from 'config/characters/reset'

const AddStats = ({ selected, resetCharacter }) => {
  return (
    <div style={{ padding: 10, width: '100%' }}>
      <div style={{ marginBottom: 10, fontSize: 16, color: 'orange' }}>
        <div>
          <span className='highlight'>{selected.Name}</span> you currently have{' '}
          <span className='highlight'>{selected.Resets}</span> resets and you
          are level <span className='highlight'>{selected.cLevel}</span>
        </div>
        <div style={{ marginTop: 10 }}>
          On your next reset you will get{' '}
          <span className='highlight'>
            {(
              (selected.Resets + 1) *
              (config.statsPerClass
                ? config.statsClasses[selected.Class]
                : config.defaultStats)
            ).toLocaleString()}
          </span>{' '}
          bonus points
        </div>
        <div style={{ marginTop: 10 }}>
          Your next reset will cost you{' '}
          <span className='highlight'>
            {(config.resetCostType === 1
              ? config.resetCost
              : config.resetCost * (selected.Resets + 1)
            ).toLocaleString()}
          </span>{' '}
          zen
        </div>
      </div>
      <button onClick={() => resetCharacter(selected.Name)}>RESET</button>
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
          Max current resets:{' '}
          <span className='highlight'>{config.maxResets}</span>
        </div>
        <div>
          Reset Cost:{' '}
          <span className='highlight'>{config.resetCost.toLocaleString()}</span>
          {config.resetCostType === 2 && ` * Reset Number`}
        </div>

        <div style={{ marginTop: 10, fontSize: 16 }}>
          Reset Level:{' '}
          {config.levelResetType === 1 && (
            <span className='highlight'>{config.levelReset}</span>
          )}
        </div>
        {config.levelResetType === 2 && (
          <div style={{ paddingLeft: 10, display: 'inline-block' }}>
            {config.levelResetCustom.map(([reset, level], key) => (
              <div key={key}>
                › Level <span className='highlight'>{level}</span> until reset
                nr <span className='highlight'>{reset}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 10, fontSize: 16 }}>Reset bonus points:</div>
        <div style={{ paddingLeft: 10 }}>
          <div>
            › Soul Master: <span className='highlight'>430</span>
          </div>
          <div>
            › Blade Knight: <span className='highlight'>390</span>
          </div>
          <div>
            › Muse Elf: <span className='highlight'>400</span>
          </div>
          <div>
            › Magic Gladiator: <span className='highlight'>470</span>
          </div>
          <div>
            › Dark Lord: <span className='highlight'>470</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  selected: state.UserCharacters.selected
})

export default connect(mapStateToProps, { resetCharacter })(AddStats)
