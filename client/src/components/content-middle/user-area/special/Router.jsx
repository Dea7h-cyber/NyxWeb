import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
import Credits from './Credits'
import Storage from './Storage'

export default () => (
  <Switch>
    <Route path='/user/special' exact component={Credits} />
    <Route path='/user/special/storage' component={Storage} />
  </Switch>
)
