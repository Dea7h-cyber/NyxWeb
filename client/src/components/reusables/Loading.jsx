import React from 'react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'

export default ({ size, onlyIcon }) => {
  const icon = (
    <Loader
      type='Triangle'
      width={size || 50}
      height={size || 50}
      style={{ margin: '15px', textAlign: 'center' }}
    />
  )

  return onlyIcon ? (
    icon
  ) : (
    <>
      <h1 className='content-title'>Loading...</h1>
      <section className='content-body'>
        <div className='content padding'>{icon}</div>
      </section>
    </>
  )
}
