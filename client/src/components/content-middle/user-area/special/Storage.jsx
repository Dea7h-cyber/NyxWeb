import React from 'react'
import { connect } from 'react-redux'

import { Autorenew } from '@material-ui/icons'

const Storage = ({ username }) => {
  return (
    <div>
      <h1 className='content-title'>
        {username}'s storage
        <Autorenew
          className='refresh-icon'
          onClick={() => console.log('storage')}
        />
      </h1>
      <section className='content-body'>
        <div className='content'>
          <div className='storage'>
            <div className='inner'>yes</div>
          </div>
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = state => ({
  username: state.User.Login.username
})

export default connect(mapStateToProps)(Storage)
