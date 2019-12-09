import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Autorenew } from '@material-ui/icons'
import { Link, Route, Switch } from 'react-router-dom'

// Components
import Custom from '../../../reusables/Custom'
import Loading from '../../../reusables/Loading'
import Failed from '../../../reusables/Failed'
import CharacterCard from '../../../reusables/CharacterCard'
// Character
import AddStats from './character/AddStats'

// Actions
import {
  getUserCharacters,
  setSelectedCharacter
} from '../../../../redux/actions/UserCharacter'

// Helpers
// import { classToImage } from '../../../../helpers/Character'

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

const Reset = () => (
  <>
    <div className='requirements'>
      req:
      <br />
      350 level
      <br />
      200,000,000 zen
    </div>
    <div className='action'>
      <button>Reset</button>
    </div>
    <div className='reward'>
      Reward:
      <br />
      550 points
    </div>
  </>
)

const PkClear = () => (
  <>
    <div className='requirements'>
      req:
      <br />
      15.000.000 zen x PK
    </div>
    <div className='action'>
      <button>Clear PK</button>
    </div>
    <div className='reward'>
      Reward:
      <br />
      Common Status
    </div>
  </>
)

const mapStateToProps = state => ({
  authorized: state.User.Login.authorized,
  Characters: state.UserCharacters
})

export default connect(mapStateToProps, {
  getUserCharacters,
  setSelectedCharacter
})(Character)
