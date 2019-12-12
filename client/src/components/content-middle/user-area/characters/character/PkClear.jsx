import React from 'react'
import { connect } from 'react-redux'

import { clearCharacter } from 'redux/actions/UserCharacter'

const AddStats = ({ selected, clearCharacter }) => {
  const clearKills = () => {
    clearCharacter(selected.Name)
  }

  return (
    <div>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        {selected.Name} you have {selected.PkCount} kills. To clear them will
        cost you {(selected.PkCount * 15000000).toLocaleString()} zen
      </div>
      <button onClick={clearKills}>CLEAR KILLS</button>
    </div>
  )
}

const mapStateToProps = state => ({
  selected: state.UserCharacters.selected
})

export default connect(mapStateToProps, { clearCharacter })(AddStats)
