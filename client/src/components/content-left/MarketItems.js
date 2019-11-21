import React from 'react'

// Components
import Item from '../reusables/Item'

export default () => (
  <>
    <h1 className='content-title'>latest items</h1>
    <section className='content-body'>
      <div className='content padding'>
        <div>
          <Item hex='00583200EBBFF3003043' />
        </div>
        <div>
          <Item hex='00583200EBBFF9209282' />
        </div>
        <div>
          <Item hex='AD033200EBC19BA82327' />
        </div>
        <div>
          <Item hex='A8033200EBC1958C8138' />
        </div>
        <div>
          <Item hex='A8033200EBC1948C8138' />
        </div>
      </div>
    </section>
  </>
)
