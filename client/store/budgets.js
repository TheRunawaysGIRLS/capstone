import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_BUDGETS = 'GET_BUDGETS'
const ADD_BUDGET = 'ADD_BUDGET'

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
const addBudget = budget => ({type: ADD_BUDGET, budget})

/**
 * THUNK CREATORS
 */
export const fetchBudgets = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/budgets/${userId}`)
    let budgets = res.data
    dispatch(getBudgets(budgets || initialState))
  } catch (err) {
    console.error(err)
  }
}

export const addBudgetToDB = budget => async dispatch => {
  try {
    const res = await axios.post('/api/budgets', budget)
    let newBudget = res.data
    dispatch(addBudget(newBudget || initialState))
  } catch (err) {
    console.error(err)
  }
}

export const deleteBudget = budgetId => async dispatch => {
  try {
    const res = await axios.delete(`/api/budgets/${budgetId}`)
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
    case ADD_BUDGET:
      return {...state, allBudgets: [...state.allBudgets, action.budget]}
    default:
      return state
  }
}
