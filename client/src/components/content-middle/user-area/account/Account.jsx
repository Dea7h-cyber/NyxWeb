import React from 'react'
import { connect } from 'react-redux'

// Components
// import News from './News'

const Account = ({ username }) => (
  <div>
    <h1 className='content-title'>{username}'s account</h1>
    <section className='content-body'>user account</section>
  </div>
)

const mapStateToProps = state => ({
  username: state.User.Login.username
})

export default connect(mapStateToProps)(Account)
