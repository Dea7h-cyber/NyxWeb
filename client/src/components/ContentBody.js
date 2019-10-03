import React from 'react'
import ContentLeft from './Content-Left'
import ContentMiddle from './Content-Middle'
import ContentRight from './Content-Right'

function ContentBody() {
  return (
    <main className="main-content">
      <ContentLeft />
      <ContentMiddle />
      <ContentRight />
    </main>
  )
}

export default ContentBody;