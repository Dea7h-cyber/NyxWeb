import React from 'react'
// import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie'

export default () => {
  const cookie = new Cookies()
  const user = cookie.get('username')

  // function onSubmit(data) {
  //   // event.preventDefault()
  //   console.log(data);
  // }

  return (
    <>
      <h1 className="content-title">{user ? `welcome ${user}` : 'login'}</h1>
      <section className="content-body padding">
        {user ? <div>logged in</div> : <div>logged out</div>}
      </section>
    </>
  )
}
