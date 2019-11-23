import React from 'react'
import { Link } from 'react-router-dom'

// Components
import Item from '../reusables/Item.jsx'

export default () => (
  <>
    <h1 className='content-title'>latest items</h1>
    <section className='content-body'>
      <div className='content market-side'>
        <Link to='/market/1'>
          <Item hex='00583200EBBFF3003043' />
        </Link>
        <Link to='/market/2'>
          <Item hex='00583200EBBFF9209282' />
        </Link>
        <Link to='/market/3'>
          <Item hex='AD033200EBC19BA82327' />
        </Link>
        <Link to='/market/4'>
          <Item hex='A8033200EBC1958C8138' />
        </Link>
        <Link to='/market/5'>
          <Item hex='A8033200EBC1948C8138' />
        </Link>
      </div>
    </section>
  </>
)
