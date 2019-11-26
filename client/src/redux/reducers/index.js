import { combineReducers } from 'redux'

import Rankings from './Rankings'
import User from './User'
import UserCharacters from './UserCharacters'

export default combineReducers({
  Rankings,
  User,
  UserCharacters
})
