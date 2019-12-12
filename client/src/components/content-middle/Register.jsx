import React, { useState } from 'react'
import { connect } from 'react-redux'
import { TextField } from 'components/reusables/Forms'

// Actions
import { doRegister } from 'redux/actions/User'

const Register = ({ doRegister }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    repassword: '',
    email: ''
  })

  const onClick = event => {
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
          <TextField
            label='Account Name'
            value={form.username}
            onChange={onChange}
            name='username'
            rules='letters and digits only'
            pattern={/[^a-z0-9]/i}
          />
          <TextField
            label='Password'
            value={form.password}
            onChange={onChange}
            name='password'
            rules='letters and digits only'
            type='password'
            pattern={/[^a-z0-9]/i}
          />
          <TextField
            label='Repeat Password'
            value={form.repassword}
            onChange={onChange}
            name='repassword'
            rules='repeat your password'
            type='password'
            pattern={/[^a-z0-9]/i}
          />
          <TextField
            label='E-Mail Adress'
            value={form.email}
            onChange={onChange}
            name='email'
            rules='valid E-Mail Adress'
            pattern={/(\S+@\S+\.\S+)/i}
          />
          <button onClick={onClick} style={{ marginTop: 10 }}>
            CREATE ACCOUNT
          </button>
        </div>
      </section>
    </div>
  )
}

export default connect(null, { doRegister })(Register)
