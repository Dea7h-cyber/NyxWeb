import React from 'react'
import { Switch, Route } from 'react-router-dom'

// Components
import News from './News'
import Rankings from './Rankings'

function ContentMiddle() {
  return (
    <main className="main-middle">
      <Switch>
        <Route exact path='/'>
          <News />
        </Route>
        <Route exact path='/rankings'>
          <Rankings />
        </Route>
      </Switch>
    </main>
  )
}

export default ContentMiddle;