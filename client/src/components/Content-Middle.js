import React from 'react'

import News from './pages/News'
import Rankings from './pages/Rankings'


function ContentMiddle() {
  return (
    <main className="main-middle">
      <News />
      <Rankings />
      <div style={{ height: 300 }}>s</div>
    </main>
  )
}

export default ContentMiddle;