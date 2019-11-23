import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import combinedReducers from './reducers'

export default createStore(
  combinedReducers,
  {},
  composeWithDevTools(applyMiddleware(thunk))
)
