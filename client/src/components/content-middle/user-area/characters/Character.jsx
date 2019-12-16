import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Autorenew } from '@material-ui/icons'
import { Link, Route, Switch } from 'react-router-dom'

// Components
import Custom from 'components/reusables/Custom'
import Loading from 'components/reusables/Loading'
import Failed from 'components/reusables/Failed'
import CharacterCard from 'components/reusables/CharacterCard'

// Character Options
import Reset from './Reset'
import PkClear from './PkClear'
import AddStats from './AddStats'

// Actions
import {
  getUserCharacters,
  setSelectedCharacter
} from 'redux/actions/UserCharacter'

const Character = ({
  Characters: { characters, selected, failed },
  getUserCharacters,
  setSelectedCharacter,
  match: {
    params: { name }
  },
  authorized
}) => {
  const [loading, setLoading] = useState(false)

  const reFetch = async () => {
    setLoading(true)
    await getUserCharacters()
    setLoading(false)
  }

  useEffect(() => {
    const runSetter = async () => {
      setLoading(true)
      if (!characters) {
        await getUserCharacters()
      } else {
        const findOne = characters.find(char => char && char.Name === name)

        await setSelectedCharacter(findOne ? findOne : false)
      }
      setLoading(false)
    }

    if (authorized) {
      runSetter()
    }
  }, [characters, authorized, name, setSelectedCharacter, getUserCharacters])

  return !authorized ? (
    <Custom
      title='not authorized'
      message='You are not authorized. Please login and try again.'
    />
  ) : loading ? (
    <Loading />
  ) : failed || !selected ? (
    <Failed />
  ) : (
    <div>
      <h1 className='content-title'>
        {selected.Name}'s area
        <Autorenew className='refresh-icon' onClick={reFetch} />
      </h1>
      <section className='content-body'>
        <div className='content user-characters'>
          <div className='left-content'>
            <CharacterCard char={selected} />
            <div className='char-info'>
              <div className='row'>Resets: {selected.Resets}</div>
              <div className='row'>Level: {selected.cLevel}</div>
              <div className='row'>Zen: {selected.Money.toLocaleString()}</div>
            </div>
          </div>
          <div className='nav-menu'>
            <Link to={`/user/characters/${selected.Name}/reset`}>reset</Link>
            <Link to={`/user/characters/${selected.Name}/pkclear`}>
              clear pk
            </Link>
            <Link to={`/user/characters/${selected.Name}/addstats`}>
              stats adder
            </Link>
          </div>
          <div className='main-content'>
            <div className='inner'>
              <Switch>
                <Route
                  path='/user/characters/:name/pkclear'
                  component={PkClear}
                />
                <Route
                  path='/user/characters/:name/addstats'
                  component={AddStats}
                />
                <Route path='/user/characters/:name' component={Reset} />
              </Switch>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = state => ({
  authorized: state.User.Login.authorized,
  Characters: state.UserCharacters
})

export default connect(mapStateToProps, {
  getUserCharacters,
  setSelectedCharacter
})(Character)
