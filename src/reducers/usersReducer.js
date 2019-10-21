import { ADD_USER, LOGIN, LOGOUT } from '../constants'

const initialState = {
  currentUserId: 0,
  allUsers: [
    {
      id: 1,
      login: 'admin',
      password: '123',
      sex: 'male',
    }
  ]
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        allUsers: [
          ...state.allUsers,
          {
            id: action.id,
            login: action.user.login,
            password: action.user.password,
            sex: action.user.sex,
          }
        ],
        currentUserId: action.id
      }
    case LOGIN:
      return {
        ...state,
        currentUserId: action.id,
      }

    case LOGOUT:
      return {
        ...state,
        currentUserId: 0,
      }
      
    default:
      return state
  }
}

export default users