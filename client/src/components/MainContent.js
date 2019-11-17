import React from 'react'
import ContentLeft from './content-left/'
import ContentMiddle from './content-middle/'
import ContentRight from './content-right/'

export default () => (
  <main className='main-content'>
    <ContentLeft />
    <ContentMiddle />
    <ContentRight />
  </main>
)
