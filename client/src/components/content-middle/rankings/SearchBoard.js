import React from 'react'

export default () => {
  return (
    <div className='search-bar'>
      <ul>
        <li>
          <input type='checkbox' id='sm' />
          <label htmlFor='sm'>Soul Master</label>
        </li>
        <li>
          <input type='checkbox' id='bk' />
          <label htmlFor='bk'>Blade Knight</label>
        </li>
        <li>
          <input type='checkbox' id='me' />
          <label htmlFor='me'>Muse Elf</label>
        </li>
        <li>
          <input type='checkbox' id='mg' />
          <label htmlFor='mg'>Magic Gladiator</label>
        </li>
        <li>
          <input type='checkbox' id='dl' />
          <label htmlFor='dl'>Dark Lord</label>
        </li>
      </ul>
    </div>
  )
}
