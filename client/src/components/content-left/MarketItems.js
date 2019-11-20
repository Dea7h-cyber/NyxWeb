import React from 'react'

// Components
import Item from '../reusables/Item'

export default () => (
  <>
    <h1 className='content-title'>latest items</h1>
    <section className='content-body'>
      <div className='content padding'>
        <div>
          <Item hex='00043200EBBFCF001644' />
        </div>
        <div>
          <Item hex='00003200EBBFD1004765' />
        </div>
        <div>
          <Item hex='00033200EBBFD8003591' />
        </div>
        <div>
          <Item hex='00583200EBBFF3003043' />
        </div>
        <div>
          <Item hex='00583200EBBFF9209282' />
        </div>
        {/* <div>
          <Item hex='046C3200EBC02DCC1595' />
        </div> */}
      </div>
    </section>
  </>
)
