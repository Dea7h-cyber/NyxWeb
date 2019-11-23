import React from 'react'
import { Link } from 'react-router-dom'

export default () => (
  <nav className="main-nav">
    <Link to='/'>home</Link>
    <Link to='/register'>register</Link>
    <Link to='/downloads'>game files</Link>
    <Link to='/stats'>statistics</Link>
    <Link to='/rankings'>rankings</Link>
    <Link to='/forums'>forums</Link>
  </nav>
)
