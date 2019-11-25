import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
// import News from './News'

export default () => (
  <Switch>
    <Route path='/user/special' component={() => <div>special</div>} />
    <Route path='/user/special/storage' component={() => <div>special?</div>} />
  </Switch>
)
