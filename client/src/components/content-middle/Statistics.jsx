import React from 'react'

import Item from '../reusables/Item.jsx'

export default () => {
  return (
    <>
      <h1 className='content-title'>statistics</h1>
      <section className='content-body'>
        <div className='content padding'>
          <Item
            hex='174FFF00EBC1D9805735'
            options={{ image: true, size: 32 }}
          />
        </div>
        <div className='content padding'>
          <Item
            hex='13FFFF44EBBFC97F5186'
            options={{ image: true, size: 32 }}
          />
        </div>
      </section>
    </>
  )
}
