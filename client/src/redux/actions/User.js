import {
  CREATE_USER,
  CREATE_USER_FAILED,
  CREATE_USER_LOADING,
  AUTHORIZE_USER,
  AUTHORIZE_USER_FAILED,
  AUTHORIZE_USER_LOADING,
  USER_LOGOUT
} from './types'

import axios from 'axios'

import Notice from '../../helpers/Notice'

export const doRegister = form => async dispatch => {
  try {
    dispatch({ type: CREATE_USER_LOADING })

    const response = await axios.post('/api/users/register', form)

    Notice(response.data)

    dispatch({ type: CREATE_USER })
  } catch (error) {
    dispatch({ type: CREATE_USER_FAILED })
  }
}

export const Authorize = form => async dispatch => {
  try {
    dispatch({ type: AUTHORIZE_USER_LOADING })

    const response = await axios.post('/api/users/authorize', form)

    Notice(response.data)

    if (response.data.message) {
      dispatch({ type: AUTHORIZE_USER, payload: form.username })
      localStorage.setItem('username', form.username)
      // TODO: get a token from the server and save it as cookie/localStorage?
    } else {
      dispatch({ type: AUTHORIZE_USER_FAILED })
    }
  } catch (error) {
    Notice({ error: 'Authorization failed. Please try again later.' })
    dispatch({ type: AUTHORIZE_USER_FAILED })
  }
}

export const Logout = () => dispatch => {
  dispatch({ type: USER_LOGOUT })
  localStorage.removeItem('username')
}
