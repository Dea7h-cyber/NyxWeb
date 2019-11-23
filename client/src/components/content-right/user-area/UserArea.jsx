import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// Actions
import { Logout } from '../../../redux/actions/User'

const UserArea = ({ Login: { username, loading }, Logout }) => {
  const onLogout = () => Logout()

  return (
    <>
      <h1 className='content-title'>welcome {username}</h1>
      <section className='content-body'>welcome to your profile</section>
    </>
  )
}

const mapStateToProps = state => ({
  Login: state.User.Login
})

export default connect(mapStateToProps, { Logout })(UserArea)
