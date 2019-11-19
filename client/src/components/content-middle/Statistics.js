import React from 'react'

import Item from '../reusables/Item'

export default () => {
  return (
    <>
      <h1 className='content-title'>statistics</h1>
      <section className='content-body'>
        <div className='content padding'>
          <Item hex='13FFFF44EBBFC97F5186' options={{ image: false }} />
        </div>
        <div className='content padding'>
          <Item hex='13FFFF44EBBFC97F5186' options={{ image: true }} />
        </div>
      </section>
    </>
  )
}
