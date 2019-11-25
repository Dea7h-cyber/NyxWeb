import React, { useState } from 'react'
import { connect } from 'react-redux'

// Components
import Login from './Login'
import UserArea from './UserArea'

const Main = ({ authorized }) => {
  const [loading, setLoading] = useState(false)

  return authorized ? (
    <UserArea />
  ) : (
    <Login loading={loading} setLoading={setLoading} />
  )
}

const mapStateToProps = state => ({
  authorized: state.User.Login.authorized
})

export default connect(mapStateToProps)(Main)
