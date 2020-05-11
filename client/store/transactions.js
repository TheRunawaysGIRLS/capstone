import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

/**
 * INITIAL STATE
 */
const initialState = {
  allTransactions: [],
  singleTransaction: {}
}

/**
 * ACTION CREATORS
 */
const getTransactions = transactions => ({type: GET_TRANSACTIONS, transactions})

/**
 * THUNK CREATORS
 */
export const fetchTransactions = () => async dispatch => {
  try {
    const res = await axios.post('/api/plaid/transactions/get', {
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
    let transactions = res.data.transactions
    dispatch(getTransactions(transactions || initialState))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {...state, allTransactions: action.transactions}
    default:
      return state
  }
}
