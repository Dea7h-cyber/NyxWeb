import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'

// Components
import Character from './Character'

export default () => {
  const [characters, setCharacters] = useState({ data: [] })
  const [error, setError] = useState(false)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const result = await axios('/api/characters')
        setCharacters(result.data)
      } catch (_) {
        setError("Couldn't load data")
      } finally {
        setLoader(false)
      }
    }

    fetchCharacters()
  }, [])

  return loader ? (
    <Loader
      type='Triangle'
      width={50}
      height={50}
      style={{ margin: '15px', textAlign: 'center' }}
    />
  ) : (
    <>
      <h1 className='content-title'>rankings</h1>
      <section className='content-body padding'>
        <div className='rankings-table'>
          {error
            ? error
            : characters.data.length > 0
            ? characters.data.map((char, index) => (
                <Character key={index} char={{ ...char, index }} />
              ))
            : 'No characters'}
        </div>
      </section>
    </>
  )
}
