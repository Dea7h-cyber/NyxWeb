import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
import CharactersList from './CharactersList'
import Character from './Character'

export default () => (
  <Switch>
    <Route exact path='/user/characters' component={CharactersList} />
    <Route path='/user/characters/:name' component={Character} />
    <Route path='/user/characters/reset' component={Character} />
  </Switch>
)
