import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
import Account from './Account'
import Storage from './Storage'

export default () => (
  <Switch>
    <Route path='/user/account' component={Account} />
    <Route path='/user/account/storage' component={Storage} />
  </Switch>
)
