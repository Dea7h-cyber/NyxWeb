import { USER_CHARACTERS, USER_CHARACTERS_FAILED } from '../types'

const initialState = {
  characters: null,
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
    default:
      return state
  }
}
