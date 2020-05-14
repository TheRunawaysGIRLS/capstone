import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_BUDGETS = 'GET_BUDGETS'

/**
 * INITIAL STATE
 */
const initialState = {
  allBudgets: [],
  singleBudget: {}
}

/**
 * ACTION CREATORS
 */
const getBudgets = budgets => ({type: GET_BUDGETS, budgets})

/**
 * THUNK CREATORS
 */
export const fetchBudgets = () => async dispatch => {
  try {
    const res = await axios.get('/api/plaid/budgets/get', {})
    let budgets = res.data
    dispatch(getBudgets(budgets || initialState))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BUDGETS:
      return {...state, allBudgets: action.budgets}
    default:
      return state
  }
}
