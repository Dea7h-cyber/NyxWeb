import {
  USER_CHARACTERS,
  USER_CHARACTERS_FAILED,
  USER_CHARACTERS_SELECTED
} from '../types'
import axios from 'axios'

//* Fetch User Characters
export const getUserCharacters = () => async dispatch => {
  try {
    const response = await axios(`/api/users/characters`)

    if (response.data.error) {
      dispatch({ type: USER_CHARACTERS_FAILED })
    } else {
      dispatch({ type: USER_CHARACTERS, payload: response.data })
    }
  } catch (error) {
    dispatch({ type: USER_CHARACTERS_FAILED })
  }
}

//* Set Selected Character
export const setSelectedCharacter = name => async dispatch => {
  dispatch({ type: USER_CHARACTERS_SELECTED, payload: name })
}
