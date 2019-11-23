import {
  FETCH_CHARACTER,
  FETCH_CHARACTER_FAILED,
  FETCH_CHARACTER_LOADING
} from '../actions/types'

const initialState = {
  character: null,
  loading: true,
  failed: false
}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case FETCH_CHARACTER_LOADING:
      return {
        ...state,
        loading: true
      }
    case FETCH_CHARACTER:
      return {
        ...state,
        character: payload,
        loading: false,
        failed: false
      }
    case FETCH_CHARACTER_FAILED:
      return {
        ...state,
        character: null,
        loading: false,
        failed: true
      }
    default:
      return state
  }
}
