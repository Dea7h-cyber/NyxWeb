import React from 'react'
import { connect } from 'react-redux'

const Characters = ({ username }) => (
  <div>
    <h1 className='content-title'>{username}'s characters</h1>
    <section className='content-body padding'>
      <div className='characters-list'>
        <div className='title'>Choose your character</div>
        <div className='list'>
          <div className='character'></div>
          <div className='character'></div>
          <div className='character'></div>
          <div className='character'></div>
          <div className='character'></div>
        </div>
      </div>
    </section>
  </div>
)

const mapStateToProps = state => ({
  username: state.User.Login.username
})

export default connect(mapStateToProps)(Characters)
