import {
  CREATE_USER,
  CREATE_USER_FAILED,
  CREATE_USER_LOADING,
  AUTHORIZE_USER,
  AUTHORIZE_USER_FAILED,
  AUTHORIZE_USER_LOADING,
  USER_LOGOUT
} from '../actions/types'

const initialState = {
  Register: {
    loading: false,
    failed: false
  },
  Login: {
    authorized: false,
    loading: false,
    username: null
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_USER_LOADING:
      return {
        ...state,
        Register: {
          ...state.Register,
          loading: true
        }
      }
    case CREATE_USER:
      return {
        ...state,
        Register: {
          loading: false,
          failed: false
        }
      }
    case CREATE_USER_FAILED:
      return {
        ...state,
        Register: {
          loading: false,
          failed: true
        }
      }
    case AUTHORIZE_USER_LOADING:
      return {
        ...state,
        Login: {
          loading: true
        }
      }
    case AUTHORIZE_USER:
      return {
        ...state,
        Login: {
          authorized: true,
          loading: false,
          username: payload
        }
      }
    case AUTHORIZE_USER_FAILED:
      return {
        ...state,
        Login: {
          loading: false
        }
      }
    case USER_LOGOUT:
      return {
        ...state,
        Login: {
          authorized: false,
          loading: false,
          username: null
        }
      }
    default:
      return state
  }
}
