import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Settings, AccessibilityNew, Flare } from '@material-ui/icons'

// Components
import Resources from './Resources'

// Actions
import { Logout } from 'redux/actions/User'

const UserArea = ({ Login: { username }, Logout }) => {
  return (
    <>
      <div>
        <h1 className='content-title'>
          {username}
          <button onClick={Logout} style={logoutButton}>
            LOGOUT
          </button>
        </h1>
        <section className='content-body'>
          <Resources />
        </section>
      </div>

      <section className='content-body user-menu'>
        <Link to='/user/account'>
          <Settings />
          Account Settings
        </Link>
        <Link to='/user/characters'>
          <AccessibilityNew />
          Characters
        </Link>
        <Link to='/user/special'>
          <Flare />
          Special Features
        </Link>
      </section>
    </>
  )
}

// Style
const logoutButton = {
  float: 'right',
  padding: 2,
  paddingLeft: 6,
  paddingRight: 6,
  fontSize: 13
}

const mapStateToProps = state => ({
  Login: state.User.Login,
  Resources: state.User.Resources
})

export default connect(mapStateToProps, { Logout })(UserArea)
