import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// import Cookies from 'universal-cookie'

// Actions
import { Authorize } from '../../../redux/actions/User'

const Login = ({ Login: { authorized, loading }, Authorize }) => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const onSubmit = e => {
    e.preventDefault()
    Authorize(form)
  }

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <>
      <h1 className='content-title'>login area</h1>
      <section className='content-body'>
        <div className='content padding'>
          <form className='user-login' onSubmit={onSubmit}>
            <input
              onChange={onChange}
              value={form.username}
              className='username'
              type='text'
              placeholder='Username'
              name='username'
              pattern='[a-zA-Z0-9]{4,10}'
              maxLength='10'
              required
            />
            <input
              onChange={onChange}
              value={form.password}
              className='password'
              type='password'
              placeholder='Password'
              name='password'
              pattern='[a-zA-Z0-9]{4,10}'
              maxLength='10'
              required
            />
            <button className='login-btn'>
              {loading ? 'Loading...' : 'Login'}
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

const mapStateToProps = state => ({
  Login: state.User.Login
})

export default connect(mapStateToProps, { Authorize })(Login)
