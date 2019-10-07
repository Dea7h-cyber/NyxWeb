import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import useForm from 'react-hook-form'

function UserArea() {
  const cookie = new Cookies()
  const user = cookie.get('username')

  const { register, handleSubmit } = useForm();


  // cookies.set('myCat', 'Pacman', { path: '/' });
  // console.log(user);

  function onSubmit(data) {
    // event.preventDefault()
    console.log(data)
  }

  return (
    <Fragment>
      <h1 className="content-title">{user ? `welcome ${user}` : 'login'}</h1>
      <section className="content-body padding">
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="user-login">
            <input type="text" placeholder="Username" className="username" name="username" ref={register({ required: true, pattern: /^[a-z0-9]+$/i })} />
            <input type="password" placeholder="Password" className="password" name="password" ref={register({ required: true, pattern: /^[a-z0-9]+$/i })} />
            <button type="submit" className="login-btn">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Login
            </button>
          </div>
          <div className="user-register"><Link to="/register">Don't have an account yet?</Link></div>
        </form>
      </section>
    </Fragment>
  )
}

export default UserArea;