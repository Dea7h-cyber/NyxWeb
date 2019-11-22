import React, { useEffect, useState } from 'react'

export default () => {
  const [animation, setAnimation] = useState('')

  useEffect(() => setAnimation(animation), [])

  return (
    <header className='main-header'>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </header>
  )
}
