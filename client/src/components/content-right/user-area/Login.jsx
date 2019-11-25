import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

// Actions
import { Authorize } from '../../../redux/actions/User'

// Components
import Loading from '../../reusables/Loading'

const Login = ({ Authorize, loading, setLoading }) => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const onSubmit = async e => {
    e.preventDefault()

    setLoading(true)
    await Authorize(form)
    setLoading(false)
  }

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div>
      <h1 className='content-title'>login area</h1>
      <section className='content-body'>
        <div className='content padding'>
          {loading ? (
            <Loading size={25} onlyIcon={true} />
          ) : (
            <>
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
                <button className='login-btn'>Login</button>
              </form>
              <div className='user-register'>
                <Link to='/register'>Don't have an account yet?</Link>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default connect(null, { Authorize })(Login)
