import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// Components
import Loading from '../../reusables/Loading'

// Actions
import { Logout, fetchResources } from '../../../redux/actions/User'

const UserArea = ({
  Login: { username },
  Resources,
  Logout,
  fetchResources
}) => {
  const [loading, setLoading] = useState(true)
  const [resources, setResources] = useState([])

  useEffect(() => {
    const getResources = async () => {
      await fetchResources()
      setLoading(false)
    }

    getResources()
  }, [fetchResources])

  useEffect(() => {
    let list = []
    for (let key in Resources.data) {
      list.push(
        <div key={key}>
          {Resources.data[key].name}: {Resources.data[key].amount}
        </div>
      )
    }

    setResources(list)
  }, [Resources.data])

  return (
    <div>
      <h1 className='content-title'>
        {username}
        <button onClick={Logout} style={logoutButton}>
          LOGOUT
        </button>
      </h1>
      <section className='content-body padding'>
        {loading ? (
          <Loading size={25} />
        ) : Resources.failed ? (
          'Resources failed to load'
        ) : (
          resources
        )}
      </section>
    </div>
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

export default connect(mapStateToProps, { Logout, fetchResources })(UserArea)
