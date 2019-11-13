import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from 'react-loader-spinner'

export default ({
  match: {
    params: { name }
  }
}) => {
  const [character, setCharacter] = useState(false)
  const [error, setError] = useState(false)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios(`/api/characters/${name}`)
        setCharacter(response.data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoader(false)
      }
    }

    fetchCharacter()
  }, [name])

  return loader ? (
    <Loader
      type='Triangle'
      width={50}
      height={50}
      style={{ margin: '15px', textAlign: 'center' }}
    />
  ) : (
    <>
      <h1 className='content-title'>{character.Name}'s profile</h1>
      <section className='content-body padding'>
        <div className='rankings-table'>
          {error ? error : character ? character.Name : 'No characters'}
        </div>
      </section>
    </>
  )
}
