import React from 'react'

export default ({ title, message }) => (
  <div>
    <h1 className='content-title'>{title}</h1>
    <section className='content-body'>
      <div className='content padding'>{message}</div>
    </section>
  </div>
)
