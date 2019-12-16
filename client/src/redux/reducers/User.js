import {
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_VERIFICATION,
  USER_VERIFICATION_FAILED,
  USER_FETCH_RESOURCES,
  USER_FETCH_RESOURCES_FAILED,
  USER_FETCH_WAREHOUSE,
  USER_FETCH_WAREHOUSE_FAILED,
  USER_LOGOUT
} from 'redux/types'

const initialState = {
  Login: {
    authorized: localStorage.token !== undefined,
    username: localStorage.username || null
  },
  Resources: {
    data: null,
    others: null,
    failed: false
  },
  Storage: {
    warehouse: null,
    failed: false
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_LOGIN:
      return {
        ...state,
        Login: {
          authorized: true,
          username: payload.username
        }
      }
    case USER_VERIFICATION_FAILED:
    case USER_LOGOUT:
      return {
        ...state,
        Login: {
          authorized: false,
          username: null
        }
      }
    case USER_FETCH_RESOURCES:
      return {
        ...state,
        Resources: {
          ...state.Resources,
          data: payload.data,
          others: payload.others,
          failed: false
        }
      }
    case USER_FETCH_RESOURCES_FAILED:
      return {
        ...state,
        Resources: {
          ...state.Resources,
          failed: true
        }
      }
    case USER_FETCH_WAREHOUSE:
      return {
        ...state,
        Storage: {
          ...state.Storage,
          warehouse: payload,
          failed: false
        }
      }
    case USER_FETCH_WAREHOUSE_FAILED:
      return {
        ...state,
        Storage: {
          ...state.Storage,
          failed: true
        }
      }
    case USER_VERIFICATION:
    case USER_LOGIN_FAILED:
    default:
      return state
  }
}
