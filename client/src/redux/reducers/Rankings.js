import {
  FETCH_CHARACTERS,
  FETCH_CHARACTERS_FAILED,
  FETCH_CHARACTERS_LOADING
} from '../actions/types'

const initialState = {
  characters: null,
  loading: true,
  failed: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_CHARACTERS_LOADING:
      return {
        ...state,
        loading: true
      }
    case FETCH_CHARACTERS:
      return {
        ...state,
        characters: payload,
        loading: false,
        failed: false
      }
    case FETCH_CHARACTERS_FAILED:
      return {
        ...state,
        characters: null,
        loading: false,
        failed: true
      }
    default:
      return state
  }
}
