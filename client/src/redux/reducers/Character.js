import {
  RANKINGS_CHARACTERS,
  RANKINGS_CHARACTERS_FAILED,
  PROFILE_CHARACTER,
  PROFILE_CHARACTER_FAILED
} from '../types'

const initialState = {
  Rankings: {
    characters: null,
    failed: false
  },
  Profile: {
    character: null,
    failed: false
  }
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case RANKINGS_CHARACTERS:
      return {
        ...state,
        Rankings: {
          characters: payload,
          failed: false
        }
      }
    case RANKINGS_CHARACTERS_FAILED:
      return {
        ...state,
        Rankings: {
          characters: false,
          failed: true
        }
      }
    case PROFILE_CHARACTER:
      return {
        ...state,
        Profile: {
          character: payload,
          failed: false
        }
      }
    case PROFILE_CHARACTER_FAILED:
      return {
        ...state,
        Profile: {
          character: null,
          failed: true
        }
      }
    default:
      return state
  }
}
