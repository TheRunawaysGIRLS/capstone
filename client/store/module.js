import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const TOGGLE_MODULE = 'TOGGLE_MODULE'
const TOGGLE_ALL_MODULE = 'TOGGLE_ALL_MODULE'
const UPDATE_MODULE_USER = 'UPDATE_MODULE_USER'

/**
 * INITIAL STATE
 */
const initialState = {
  data: []
}

/**
 * ACTION CREATORS
 */
const toggleModule = moduleId => ({
  type: TOGGLE_MODULE,
  moduleId
})

/**
 * THUNK CREATORS
 */
export const fetchDemoData = () => async dispatch => {
  console.log('GOT INTO fetchDemoData')
  try {
    const res = await axios.post('/api/plaid/transactions/get', {
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SECRET,
      access_token: process.env.PLAID_ACCESS_TOKEN,
      start_date: '2017-01-01',
      end_date: '2020-05-10',
      options: {
        count: 250,
        offset: 100
      }
    })
    console.log(res.data)
    let data = res.data
    dispatch(getDemoData(data || initialState))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DEMO_DATA:
      return {...state, data: action.data}
    default:
      return state
  }
}
