import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie'

export default () => {
  const cookie = new Cookies()
  const user = cookie.get('username')

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const onSubmit = e => {
    e.preventDefault()
    console.log(form)
  }

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <>
      <h1 className='content-title'>{user ? `welcome ${user}` : 'login'}</h1>
      <section className='content-body'>
        <div className='content padding'>
          {/* {user ? <div>logged in</div> : <div>logged out</div>} */}
          <form className='user-login' onSubmit={onSubmit}>
            <input
              onChange={onChange}
              value={form.username}
              className='username'
              type='text'
              placeholder='Username'
              name='username'
            />
            <input
              onChange={onChange}
              value={form.password}
              className='password'
              type='password'
              placeholder='Password'
              name='password'
            />
            <button className='login-btn'>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Login
            </button>
          </form>
          <div className='user-register'>
            <Link to='/register'>Don't have an account yet?</Link>
          </div>
        </div>
      </section>
    </>
  )
}
