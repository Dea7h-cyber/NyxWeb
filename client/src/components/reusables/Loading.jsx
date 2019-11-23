import React from 'react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Loader from 'react-loader-spinner'

export default () => (
  <>
    <h1 className='content-title'>Loading...</h1>
    <section className='content-body'>
      <div className='content padding'>
        <Loader
          type='Triangle'
          width={50}
          height={50}
          style={{ margin: '15px', textAlign: 'center' }}
        />
      </div>
    </section>
  </>
)
