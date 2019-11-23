import { CREATE_USER, CREATE_USER_FAILED, CREATE_USER_LOADING } from './types'

import axios from 'axios'

import Notice from '../../helpers/Notice'

export const doRegister = form => async dispatch => {
  let response

  try {
    dispatch({ type: CREATE_USER_LOADING })

    response = await axios.post('/api/users/register', form)

    Notice(response.data)

    dispatch({
      type: CREATE_USER
    })
  } catch (error) {
    dispatch({
      type: CREATE_USER_FAILED
    })
  }
}
