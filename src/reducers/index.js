import { combineReducers } from 'redux'
import users from './usersReducer'
import news from './newsReducer'

const mainReducer = combineReducers({
  users,
  news,
})

export default mainReducer