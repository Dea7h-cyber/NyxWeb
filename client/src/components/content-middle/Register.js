import React, { useState } from 'react'
import axios from 'axios'
import { Notice } from '../../helpers/'

// Icons
import userIcon from '../../assets/images/user.png'
import passIcon from '../../assets/images/locked.png'
import mailIcon from '../../assets/images/at-sign.png'

export default () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    repassword: '',
    email: ''
  })

  const onSubmit = async event => {
    event.preventDefault()
    const response = await axios.post('/api/users/register', form)
    Notice(response.data)
  }

  const onChange = event =>
    setForm({ ...form, [event.target.name]: event.target.value })

  return (
    <>
      <h1 className='content-title'>create your free account</h1>
      <section className='content-body padding'>
        <form onSubmit={onSubmit} className='classic-form'>
          <div className='field-area'>
            <label className='field-title' htmlFor='username'>
              Username
            </label>
            <input
              type='text'
              name='username'
              onChange={onChange}
              value={form.username}
              pattern='[a-zA-Z0-9]{4,}'
              maxLength='10'
              required
              style={{
                paddingLeft: 37,
                background: `#ffffff url(${userIcon}) no-repeat left 5px center/25px 25px`
              }}
              id='username'
            />
            <div className='field-description'>
              minimum 4 and maximum 10 characters (only letters and digits
              allowed)
            </div>
          </div>
          <div className='field-area'>
            <label className='field-title' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              name='password'
              onChange={onChange}
              value={form.password}
              pattern='[a-zA-Z0-9]{4,}'
              maxLength='10'
              required
              style={{
                paddingLeft: 37,
                background: `#ffffff url(${passIcon}) no-repeat left 5px center/25px 25px`
              }}
              id='password'
            />
            <div className='field-description'>
              minimum 4 and maximum 10 characters (only letters and digits
              allowed)
            </div>
          </div>
          <div className='field-area'>
            <label className='field-title' htmlFor='repassword'>
              Repeat Password
            </label>
            <input
              type='password'
              name='repassword'
              onChange={onChange}
              value={form.repassword}
              pattern='[a-zA-Z0-9]{4,10}'
              maxLength='10'
              required
              style={{
                paddingLeft: 37,
                background: `#ffffff url(${passIcon}) no-repeat left 5px center/25px 25px`
              }}
              id='repassword'
            />
            <div className='field-description'>repeat the password</div>
          </div>
          <div className='field-area'>
            <label className='field-title' htmlFor='email'>
              E-Mail Adress
            </label>
            <input
              type='email'
              name='email'
              onChange={onChange}
              value={form.email}
              required
              style={{
                paddingLeft: 37,
                background: `#ffffff url(${mailIcon}) no-repeat left 7px center/22px 22px`
              }}
              id='email'
            />
            <div className='field-description'>
              please use a valid E-Mail adress, you will need it
            </div>
          </div>
          <button>CREATE ACCOUNT</button>
        </form>
      </section>
    </>
  )
}
