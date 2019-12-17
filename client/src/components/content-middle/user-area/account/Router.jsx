import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import NotAuthorized from 'components/reusables/NotAuthorized'
import Account from './Account'

const AccountRouter = ({ authorized }) =>
  !authorized ? (
    <NotAuthorized />
  ) : (
    <Switch>
      <Route path='/user/account' component={Account} />
    </Switch>
  )

const mapStateToProps = state => ({
  authorized: state.User.Login.authotized
})

export default connect(mapStateToProps)(AccountRouter)
