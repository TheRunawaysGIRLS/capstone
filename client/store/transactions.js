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
    const res = await axios.post('/transactions/get', {
      client_id: '5eb323bcc2fef80013fabf81',
      secret: 'ff551700f5b73fec740da91c90d546',
      access_token: 'access-sandbox-73791a54-f533-49b5-a82b-86245bec3f76',
      start_date: '2017-01-01',
      end_date: '2018-01-01',
      options: {
        count: 250,
        offset: 100
      }
    })
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
