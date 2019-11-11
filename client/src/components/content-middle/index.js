import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
import News from './News'
import Rankings from './rankings/'
import Register from './Register'

export default () => (
  <main className="main-middle">
    <Switch>
      <Route exact path="/" component={News} />
      <Route exact path="/rankings" component={Rankings} />
      <Route exact path="/register" component={Register} />
    </Switch>
  </main>
)
