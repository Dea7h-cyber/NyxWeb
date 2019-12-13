import React from 'react'
import { connect } from 'react-redux'

import { resetCharacter } from 'redux/actions/UserCharacter'

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
            {((selected.Resets + 1) * 450).toLocaleString()}
          </span>{' '}
          bonus points
        </div>
        <div style={{ marginTop: 10 }}>
          Your next reset will cost{' '}
          <span className='highlight'>
            {((selected.Resets + 1) * 25000000).toLocaleString()}
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
          fontSize: 15,
          border: '1px solid #121212',
          borderRadius: 5,
          width: '100%'
        }}>
        <div>
          Max current resets: <span className='highlight'>50</span>
        </div>
        <div>
          Reset Level: <span className='highlight'>400</span>
        </div>
        <div>
          Reset Cost: <span className='highlight'>25,000,000</span> * Reset
          Number
        </div>
        <div style={{ marginTop: 10, fontSize: 18 }}>Reset bonus points:</div>
        <div style={{ paddingLeft: 10 }}>
          <div>
            ♦ Soul Master: <span className='highlight'>430</span>
          </div>
          <div>
            ♦ Blade Knight: <span className='highlight'>390</span>
          </div>
          <div>
            ♦ Muse Elf: <span className='highlight'>400</span>
          </div>
          <div>
            ♦ Magic Gladiator: <span className='highlight'>470</span>
          </div>
          <div>
            ♦ Dark Lord: <span className='highlight'>470</span>
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
