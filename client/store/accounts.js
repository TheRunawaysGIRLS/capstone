import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ACCOUNTS = 'GET_ACCOUNTS'

/**
 * INITIAL STATE
 */
const initialState = {
  allAccounts: [],
  singleAccount: {}
}

/**
 * ACTION CREATORS
 */
const getAccounts = accounts => ({type: GET_ACCOUNTS, accounts})

/**
 * THUNK CREATORS
 */
export const fetchAccounts = () => async dispatch => {
  try {
    const res = await axios.post('/api/plaid/accounts/balance/get', {
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SECRET,
      access_token: process.env.PLAID_ACCESS_TOKEN,
      start_date: '2017-01-01',
      end_date: '2018-01-01',
      options: {
        count: 250,
        offset: 100
      }
    })
    console.log(res.data)
    let accounts = res.data.balance.accounts
    dispatch(getAccounts(accounts || initialState))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return {...state, allAccounts: action.accounts}
    default:
      return state
  }
}
