import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
// import News from './News'

export default () => (
  <Switch>
    <Route
      path='/user/characters'
      component={() => <div>characters display here</div>}
    />
    <Route
      path='/user/characters/reset'
      component={() => <div>reset? xx</div>}
    />
  </Switch>
)
