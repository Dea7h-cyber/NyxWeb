import React from 'react'
import ContentLeft from './content-left/Router'
import ContentMiddle from './content-middle/Router'
import ContentRight from './content-right/Router'

export default () => (
  <main className='main-content'>
    <ContentLeft />
    <ContentMiddle />
    <ContentRight />
  </main>
)
