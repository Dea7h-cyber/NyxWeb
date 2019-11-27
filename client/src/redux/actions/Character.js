import {
  RANKINGS_CHARACTERS,
  RANKINGS_CHARACTERS_FAILED,
  PROFILE_CHARACTER,
  PROFILE_CHARACTER_FAILED
} from '../types'
import axios from 'axios'

//* Fetch one Character
export const getOne = name => async dispatch => {
  try {
    const response = await axios(`/api/characters/${name}`)

    if (response.data.error) {
      dispatch({ type: PROFILE_CHARACTER_FAILED })
    } else {
      dispatch({ type: PROFILE_CHARACTER, payload: response.data })
    }
  } catch (error) {
    dispatch({ type: PROFILE_CHARACTER_FAILED })
  }
}

//* Fetch Many Characters
export const getMany = search => async dispatch => {
  try {
    const url = `/api/characters?page=${search.page}&class=${search.class.join(
      ','
    )}&order=${search.order.join(',')}${
      search.name ? `&search=${search.name}` : ''
    }`

    const response = await axios(url)

    if (response.data.error) {
      dispatch({ type: RANKINGS_CHARACTERS_FAILED })
    } else {
      dispatch({ type: RANKINGS_CHARACTERS, payload: response.data })
    }
  } catch (error) {
    dispatch({ type: RANKINGS_CHARACTERS_FAILED })
  }
}
