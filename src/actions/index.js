import { ADD_USER, LOGIN, LOGOUT } from '../constants'

let nextuserId = 2; // 0 - anonymous, 1 - admin
export const addUser = (user) => {
  return {
    type: ADD_USER,
    id: nextuserId++,
    user
  }
}

export const login = (id) => {
  return {
    type: LOGIN,
    id
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}