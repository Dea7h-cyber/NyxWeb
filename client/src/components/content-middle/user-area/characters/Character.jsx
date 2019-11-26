import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Autorenew } from '@material-ui/icons'

// Components
import Loading from '../../../reusables/Loading'
import Failed from '../../../reusables/Failed'

// Actions
import { getUserCharacters } from '../../../../redux/actions/Character'

// Helpers
import { classToImage } from '../../../../helpers/Character'

const Character = ({
  username,
  Characters: { characters, failed },
  getUserCharacters,
  match: {
    params: { name }
  }
}) => {
  const [loading, setLoading] = useState(false)

  const reFetch = async () => {
    setLoading(true)
    await getUserCharacters()
    setLoading(false)
  }

  return loading ? (
    <Loading />
  ) : failed ? (
    <Failed />
  ) : (
    <div>
      <h1 className='content-title'>
        {name}'s options
        <Autorenew
          style={{ float: 'right', cursor: 'pointer' }}
          onClick={reFetch}
        />
      </h1>
      <section className='content-body padding'>
        <div className='characters-list'>
          <div className='title'>menu? :</div>
          <div className='list'>char? you chose {name}</div>
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = state => ({
  username: state.User.Login.username,
  Characters: state.UserCharacters
})

export default connect(mapStateToProps, { getUserCharacters })(Character)
