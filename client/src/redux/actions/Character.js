import axios from 'axios'
import {
  FETCH_CHARACTER,
  FETCH_CHARACTER_FAILED,
  FETCH_CHARACTER_LOADING,
  FETCH_CHARACTERS,
  FETCH_CHARACTERS_FAILED,
  FETCH_CHARACTERS_LOADING
} from './types'

//* Fetch one Character
export const getOne = name => async dispatch => {
  try {
    dispatch({ type: FETCH_CHARACTER_LOADING })

    const response = await axios(`/api/characters/${name}`)

    dispatch({
      type: FETCH_CHARACTER,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: FETCH_CHARACTER_FAILED
    })
  }
}

//* Fetch Many Characters
export const getMany = search => async dispatch => {
  try {
    dispatch({ type: FETCH_CHARACTERS_LOADING })

    const url = `/api/characters?page=${search.page}&class=${search.class.join(
      ','
    )}&order=${search.order.join(',')}${
      search.name ? `&search=${search.name}` : ''
    }`

    const response = await axios(url)

    dispatch({
      type: FETCH_CHARACTERS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: FETCH_CHARACTERS_FAILED
    })
  }
}
