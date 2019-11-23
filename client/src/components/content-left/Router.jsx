import React from 'react'

// Components
import Events from './Events.jsx'
import MarketItems from './MarketItems.jsx'

export default () => (
  <aside className='main-left'>
    <Events />
    <div className='content-spacer' />
    <MarketItems />
  </aside>
)
