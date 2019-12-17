import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import NotAuthorized from 'components/reusables/NotAuthorized'
import Credits from './Credits'
import Storage from './Storage'

const SpecialRouter = ({ authorized }) =>
  !authorized ? (
    <NotAuthorized />
  ) : (
    <Switch>
      <Route path='/user/special' exact component={Credits} />
      <Route path='/user/special/storage' component={Storage} />
    </Switch>
  )

const mapStateToProps = state => ({
  authorized: state.User.Login.authorized
})

export default connect(mapStateToProps)(SpecialRouter)
