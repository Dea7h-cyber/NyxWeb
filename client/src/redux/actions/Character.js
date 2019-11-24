import axios from 'axios'

//* Fetch one Character
export const getOne = name => async () => {
  try {
    const response = await axios(`/api/characters/${name}`)

    return response.data
  } catch (_) {
    return false
  }
}

//* Fetch Many Characters
export const getMany = search => async () => {
  try {
    const url = `/api/characters?page=${search.page}&class=${search.class.join(
      ','
    )}&order=${search.order.join(',')}${
      search.name ? `&search=${search.name}` : ''
    }`

    const response = await axios(url)

    return response.data
  } catch (_) {
    return false
  }
}
