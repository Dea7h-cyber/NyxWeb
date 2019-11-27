import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Autorenew } from '@material-ui/icons'

// Components
import Loading from '../../../reusables/Loading'
import Failed from '../../../reusables/Failed'
import CharacterCard from '../../../reusables/CharacterCard'

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
  }
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
        await reFetch()
      } else {
        const findOne = characters.find(char => char.Name === name)

        await setSelectedCharacter(findOne)
        setLoading(false)
      }
    }

    runSetter()
  }, [characters])

  return loading || !selected ? (
    <Loading />
  ) : failed ? (
    <Failed />
  ) : (
    <div>
      <h1 className='content-title'>
        {selected.Name}'s options
        <Autorenew className='refresh-icon' onClick={reFetch} />
      </h1>
      <section className='content-body padding'>
        <div className='characters-list'>
          <div className='title'>menu? :</div>
          <div className='list'>char? you chose {selected.Name}</div>
          <div className=''>
            <CharacterCard char={selected} />
          </div>
        </div>
      </section>
    </div>
  )
}

const mapStateToProps = state => ({
  username: state.User.Login.username,
  Characters: state.UserCharacters
})

export default connect(mapStateToProps, {
  getUserCharacters,
  setSelectedCharacter
})(Character)
