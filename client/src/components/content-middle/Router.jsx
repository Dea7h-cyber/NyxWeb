import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
import News from './News'
import Rankings from './rankings/Main'
import Register from './Register'
import Profile from './Profile'
import Statistics from './Statistics'
import UserArea from './user-area/Router'

export default () => (
  <main className='main-middle'>
    <Switch>
      <Route exact path='/' component={News} />
      <Route path='/rankings/:page?' component={Rankings} />
      <Route path='/register' component={Register} />
      <Route path='/profile/:name' component={Profile} />
      <Route path='/stats' component={Statistics} />
      <Route path='/user' component={UserArea} />
    </Switch>
  </main>
)
