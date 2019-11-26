import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
import Characters from './Characters'

export default () => (
  <Switch>
    <Route path='/user/characters' component={Characters} />
    <Route path='/user/characters/reset' component={Characters} />
  </Switch>
)
