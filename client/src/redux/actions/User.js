import {
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_VERIFICATION,
  USER_VERIFICATION_FAILED,
  USER_FETCH_RESOURCES,
  USER_FETCH_RESOURCES_FAILED,
  USER_LOGOUT
} from '../types'

import axios from 'axios'

import Notice from '../../helpers/Notice'
import { transformResources } from '../../helpers/User'

export const doRegister = form => async () => {
  try {
    const response = await axios.post('/api/users/register', form)
    Notice(response.data)
  } catch (error) {
    Notice({ error: 'A problem has occured. Please try again later.' })
  }
}

export const Authorize = form => async dispatch => {
  try {
    const response = await axios.post('/api/users/authorize', form)

    Notice(response.data)

    if (response.data.token) {
      localStorage.username = form.username
      localStorage.token = response.data.token
      axios.defaults.headers.common.nyxAuthToken = response.data.token

      dispatch({
        type: USER_LOGIN,
        payload: { username: form.username, token: response.data.token }
      })
    }
  } catch (error) {
    Notice({ error: 'Authorization failed. Please try again later.' })
    dispatch({ type: USER_LOGIN_FAILED })
  }
}

export const Verification = () => async dispatch => {
  try {
    const response = await axios.get('/api/users/verification')
    dispatch({
      type: response.data.error ? USER_VERIFICATION_FAILED : USER_VERIFICATION
    })
  } catch (error) {
    dispatch({ type: USER_VERIFICATION_FAILED })
  }
}

export const Logout = () => dispatch => {
  delete axios.defaults.headers.common.nyxAuthToken
  delete localStorage.username
  delete localStorage.token
  dispatch({ type: USER_LOGOUT })
}

export const fetchResources = () => async dispatch => {
  try {
    const response = await axios.get('/api/users/resources')

    if (response.data.error) {
      dispatch({ type: USER_FETCH_RESOURCES_FAILED })
    } else {
      const resources = transformResources(response.data)
      dispatch({
        type: USER_FETCH_RESOURCES,
        payload: resources
      })
    }
  } catch (err) {
    dispatch({
      type: USER_FETCH_RESOURCES_FAILED
    })
  }
}
