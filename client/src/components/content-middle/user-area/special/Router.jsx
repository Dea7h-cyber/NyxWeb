import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

// Components
import Credits from './Credits'
import Storage from './Storage'

export default () => (
  <div>
    Menu:
    <Link to='/user/special'>Buy Credits</Link>
    <Link to='/user/special/storage'>Storage</Link>
    <Switch>
      <Route path='/user/special' exact component={Credits} />
      <Route path='/user/special/storage' component={Storage} />
    </Switch>
  </div>
)
