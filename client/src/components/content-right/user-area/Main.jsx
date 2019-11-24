import React, { useState } from 'react'
import { connect } from 'react-redux'

// Components
import Login from './Login'
import UserArea from './UserArea'

const Main = ({ Login: { authorized } }) => {
  const [loading, setLoading] = useState(false)

  return authorized ? (
    <UserArea />
  ) : (
    <Login loading={loading} setLoading={setLoading} />
  )
}

const mapStateToProps = state => ({
  Login: state.User.Login
})

export default connect(mapStateToProps)(Main)
