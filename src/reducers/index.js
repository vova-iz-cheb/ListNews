import { combineReducers } from 'redux'
import users from './usersReducer'

const mainReducer = combineReducers({
  users,
})

export default mainReducer