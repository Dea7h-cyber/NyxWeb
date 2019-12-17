import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import NotAuthorized from 'components/reusables/NotAuthorized'
import CharactersList from './CharactersList'
import Character from './Character'

const CharactersRouter = ({ authorized }) =>
  !authorized ? (
    <NotAuthorized />
  ) : (
    <Switch>
      <Route exact path='/user/characters' component={CharactersList} />
      <Route path='/user/characters/:name' component={Character} />
    </Switch>
  )

const mapStateToProps = state => ({
  authorized: state.User.Login.authorized
})

export default connect(mapStateToProps)(CharactersRouter)
