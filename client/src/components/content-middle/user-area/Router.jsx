import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
import Account from './account/Router'
import Characters from './characters/Router'
import Special from './special/Router'

export default () => (
  <Switch>
    <Route path='/user/account' component={Account} />
    <Route path='/user/characters' component={Characters} />
    <Route path='/user/special' component={Special} />
  </Switch>
)
