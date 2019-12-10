import {
  RANKINGS_CHARACTERS,
  RANKINGS_CHARACTERS_FAILED,
  PROFILE_CHARACTER,
  PROFILE_CHARACTER_FAILED
} from 'redux/types'
import axios from 'axios'

//* Fetch one Character
export const fetchOne = name => async dispatch => {
  try {
    const response = await axios(`/api/characters/${name}`)

    if (response.data.error) {
      dispatch({ type: PROFILE_CHARACTER_FAILED })
    } else {
      dispatch({ type: PROFILE_CHARACTER, payload: response.data })
    }
  } catch (_) {
    dispatch({ type: PROFILE_CHARACTER_FAILED })
  }
}

//* Fetch Many Characters
export const fetchMany = () => async dispatch => {
  try {
    const response = await axios('/api/characters')

    if (response.data.error) {
      dispatch({ type: RANKINGS_CHARACTERS_FAILED })
    } else {
      dispatch({ type: RANKINGS_CHARACTERS, payload: response.data })
    }
  } catch (error) {
    dispatch({ type: RANKINGS_CHARACTERS_FAILED })
  }
}
