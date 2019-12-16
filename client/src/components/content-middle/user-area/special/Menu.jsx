import React from 'react'

import { Link } from 'react-router-dom'

export default () => (
  <div style={{ padding: 10, textAlign: 'center' }}>
    <Link to='/user/special'>Buy Credits</Link>
    <Link to='/user/special/storage'>Storage</Link>
  </div>
)
