import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
// import News from './News'

export default () => (
  <Switch>
    <Route path='/user/account' component={() => <div>account ;]</div>} />
    <Route path='/user/account/storage' component={() => <div>storage</div>} />
  </Switch>
)
