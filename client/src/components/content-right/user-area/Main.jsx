import React, { useEffect } from 'react'
import { connect } from 'react-redux'

// Components
import Login from './Login'
import UserArea from './UserArea'

const Main = ({ Login: { authorized } }) =>
  authorized ? <UserArea /> : <Login />

const mapStateToProps = state => ({
  Login: state.User.Login
})

export default connect(mapStateToProps)(Main)
