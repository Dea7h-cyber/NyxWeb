import React from 'react'

import Events from './Events'
import MarketItems from './MarketItems'

export default () => (
  <aside className='main-left'>
    <Events />
    <div className='content-spacer' />
    <MarketItems />
  </aside>
)
