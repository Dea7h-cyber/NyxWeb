import {
  USER_CHARACTERS,
  USER_CHARACTERS_FAILED,
  USER_CHARACTERS_SELECTED,
  USER_CHARACTERS_STATS,
  USER_CHARACTERS_STATS_FAILED
} from 'redux/types'
import axios from 'axios'

import Notice from 'helpers/Notice'

//* ------------------------------------------------------------------------
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

//* ------------------------------------------------------------------------
export const setSelectedCharacter = name => async dispatch => {
  dispatch({ type: USER_CHARACTERS_SELECTED, payload: name })
}

//* ------------------------------------------------------------------------
export const updateCharacterStats = (name, stats) => async dispatch => {
  const { Strength, Dexterity, Vitality, Energy, Leadership } = stats
  try {
    const response = await axios.patch(`/api/characters/${name}/addstats`, {
      Strength,
      Dexterity,
      Vitality,
      Energy,
      Leadership
    })

    Notice(response.data)

    if (response.data.error) {
      dispatch({ type: USER_CHARACTERS_STATS_FAILED })
    } else {
      dispatch({ type: USER_CHARACTERS_STATS, payload: response.data })
      dispatch(getUserCharacters())
    }
  } catch (error) {
    dispatch({ type: USER_CHARACTERS_STATS_FAILED })
    Notice({ error: 'There was a problem. Please try again later!' })
  }
}
