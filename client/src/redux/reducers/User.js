import {
  CREATE_USER,
  CREATE_USER_FAILED,
  CREATE_USER_LOADING
} from '../actions/types'

const initialState = {
  loading: false,
  failed: false
}

export default (state = initialState, { type }) => {
  switch (type) {
    case CREATE_USER_LOADING:
      return {
        ...state,
        loading: true
      }
    case CREATE_USER:
      return {
        ...state,
        loading: false,
        failed: false
      }
    case CREATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        failed: true
      }
    default:
      return state
  }
}
