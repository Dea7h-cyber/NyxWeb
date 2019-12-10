import {
  USER_CHARACTERS,
  USER_CHARACTERS_FAILED,
  USER_CHARACTERS_SELECTED
} from 'redux/types'

const initialState = {
  characters: null,
  selected: null,
  failed: false
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_CHARACTERS:
      return {
        ...state,
        characters: payload.data,
        failed: false
      }
    case USER_CHARACTERS_FAILED:
      return {
        ...state,
        characters: null,
        failed: true
      }
    case USER_CHARACTERS_SELECTED:
      return {
        ...state,
        selected: payload
      }
    default:
      return state
  }
}
