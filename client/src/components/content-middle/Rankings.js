import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from 'react-loader-spinner'

// Helpers
import { getClassName, getClassImage } from '../../helpers/Character'

function Rankings() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoader] = useState(true)

  useEffect(() => {
    async function getCharacters() {
      const result = await axios('/api/characters')

      if (result.data) {
        setCharacters(result.data.characters)
      }
      setLoader(false)
    }

    getCharacters()
  }, [])

  return (
    <Fragment>
      <h1 className="content-title">rankings</h1>
      <section className="content-body padding">
        <div className="rankings-table">
          {
            characters.length > 0 ? characters.map((char, key) => <Character key={key} char={{ ...char, key }} />) : 'No characters'
          }
        </div>
        <Loader type="Triangle" color="Green" height={50} width={50} visible={loading} style={{ textAlign: 'center', padding: '15px' }} />
      </section>
    </Fragment>
  )
}

function Character({ char }) {

  return (
    <div className="character">
      <div className="name">{char.key + 1}.&nbsp;<Link to={`/profile/${char.Name}`}>{char.Name}</Link></div>
      <div className="image"><img src={getClassImage(char.Class)} alt={char.Class} /></div>
      <div className="info">
        <div>{getClassName(char.Class)}</div>
        <div>Resets: {char.Resets}</div>
        <div>Level: {char.cLevel}</div>
      </div>
    </div>
  )

}


export default Rankings