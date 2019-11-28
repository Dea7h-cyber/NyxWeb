import React, { useState } from 'react'
import { connect } from 'react-redux'

// Icons
import userIcon from '../../assets/images/user.png'
import passIcon from '../../assets/images/locked.png'
import mailIcon from '../../assets/images/at-sign.png'

// Components
// import Failed from '../reusables/Failed'

// Actions
import { doRegister } from '../../redux/actions/User'

const Register = ({ doRegister }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    repassword: '',
    email: ''
  })

  const onSubmit = event => {
    event.preventDefault()
    doRegister(form)
  }

  const onChange = event =>
    setForm({ ...form, [event.target.name]: event.target.value })

  return (
    <div>
      <h1 className='content-title'>create your free account</h1>
      <section className='content-body'>
        <div className='content padding'>
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
                pattern='[a-zA-Z0-9]{4,10}'
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
        </div>
      </section>
    </div>
  )
}

export default connect(null, { doRegister })(Register)
