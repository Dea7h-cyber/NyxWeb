import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'
import useForm from 'react-hook-form'
import axios from 'axios'

const cookie = new Cookies()
const user = cookie.get('username')

function UserArea() {
  return (
    <Fragment>
      <h1 className="content-title">{user ? `welcome ${user}` : 'login'}</h1>
      <section className="content-body padding">
        {user ? <LoggedIn /> : <LoggedOut />}
      </section>
    </Fragment>
  )
}

function LoggedIn() {
  return (
    <div>Welcome {user}</div>
  )
}

async function onSubmit(data) {
  try {
    const response = await axios({
      url: '/api/users/authentication',
      method: 'post',
      data
    })
    console.log('data: ', response.data);
  } catch (error) {
    console.error(error)
  }
}

function LoggedOut(props) {
  const { register, handleSubmit } = useForm();

  return (
    <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="user-login">
        <input type="text" placeholder="Username" className="username" name="username" ref={register({ required: true, pattern: /^[a-z0-9]{4,10}$/i })} />
        <input type="password" placeholder="Password" className="password" name="password" ref={register({ required: true, pattern: /^[a-z0-9]{4,10}$/i })} />
        <button type="submit" className="login-btn">Login</button>
      </div>
      <div className="user-register"><Link to="/register">Don't have an account yet?</Link></div>
    </form>
  )
}

export default UserArea;