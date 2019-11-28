import React, { useState } from 'react'
import { connect } from 'react-redux'

const AddStats = ({ selected }) => {
  const [stats, setStats] = useState({
    Strength: 0,
    Dexterity: 0,
    Vitality: 0,
    Energy: 0,
    Leadership: 0
  })

  const onChange = e =>
    setStats({ ...stats, [e.target.name]: [e.target.value] })

  return (
    <>
      <div className='requirements'>
        req:
        <br />
        Free
      </div>
      <div className='action'></div>
      <div className='reward'>
        <div className='add-stats'>
          <div className='row'>
            <div className='left'>Strength</div>
            <div className='middle'>
              <input
                type='text'
                value={stats.Strength}
                onChange={onChange}
                name='Strength'
              />
            </div>
            <div className='right'>[{selected.Strength}]</div>
          </div>
          <div className='row'>
            <div className='left'>Agility</div>
            <div className='middle'>
              <input
                type='text'
                value={stats.Dexterity}
                onChange={onChange}
                name='Dexterity'
              />
            </div>
            <div className='right'>[{selected.Dexterity}]</div>
          </div>
          <div className='row'>
            <div className='left'>Vitality</div>
            <div className='middle'>
              <input
                type='text'
                value={stats.Vitality}
                onChange={onChange}
                name='Vitality'
              />
            </div>
            <div className='right'>[{selected.Vitality}]</div>
          </div>
          <div className='row'>
            <div className='left'>Energy</div>
            <div className='middle'>
              <input
                type='text'
                value={stats.Energy}
                onChange={onChange}
                name='Energy'
              />
            </div>
            <div className='right'>[{selected.Energy}]</div>
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  selected: state.UserCharacters.selected
})

export default connect(mapStateToProps)(AddStats)
