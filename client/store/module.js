import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_MODULES = 'GET_ALL_MODULES'
const GET_USER_MODULES = 'GET_USER_MODULES'
const UPDATE_USER_MODULES = 'UPDATE_USER_MODULES'
const GET_USER_NAVBAR = 'GET_USER_NAVBAR'

/**
 * INITIAL STATE
 */
const initialState = {
  allModules: [],
  userModules: [],
  userNavBar: []
}

/**
 * ACTION CREATORS
 */
const getAllModules = modules => ({
  type: GET_ALL_MODULES,
  modules
})
const getUserModules = modules => ({
  type: GET_USER_MODULES,
  modules
})
const updateUserModules = modules => ({
  type: UPDATE_USER_MODULES,
  modules
})
const getUserNavBar = usernavbar => ({
  type: GET_USER_NAVBAR,
  usernavbar
})

/**
 * THUNK CREATORS
 */
export const fetchAllModules = () => async dispatch => {
  try {
    const res = await axios.get('/api/modules')
    dispatch(getAllModules(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchUserModules = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/modules/${userId}/Checkbox`)
    dispatch(getUserModules(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const updateUserModulesThunk = (userId, modules) => async dispatch => {
  try {
    const res = await axios.put(`/api/modules/usermodule/${userId}`, {modules})
    dispatch(updateUserModules(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const fetchUserNavBar = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/modules/${userId}/navbar`)
    dispatch(getUserNavBar(res.data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_MODULES:
      return {...state, allModules: action.modules}
    case GET_USER_MODULES:
      return {...state, userModules: action.modules}
    case UPDATE_USER_MODULES:
      return {...state, userModules: action.modules}
    case GET_USER_NAVBAR:
      return {...state, userNavBar: action.usernavbar}
    default:
      return state
  }
}
