import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
import Account from './account/Main'
import Characters from './characters/Main'
import Special from './special/Main'

export default () => (
  <Switch>
    <Route path='/user/account' component={Account} />
    <Route path='/user/characters' component={Characters} />
    <Route path='/user/special' component={Special} />
  </Switch>
)
