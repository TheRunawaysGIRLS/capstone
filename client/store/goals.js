import axios from 'axios'

const GET_GOALS = 'GET_GOALS'
const ADD_GOAL = 'ADD_GOAL'
const UPDATE_GOAL = 'UPDATE_GOAL'
//const DELETE_GOAL = 'DELETE_GOAL'

export const getGoals = goals => {
  return {
    type: GET_GOALS,
    goals
  }
}

export const addGoal = goalToAdd => {
  return {
    type: ADD_GOAL,
    goalToAdd
  }
}

export const updateGoal = goalToUpdate => {
  return {
    type: UPDATE_GOAL,
    goalToUpdate
  }
}

const initialState = {
  allGoals: []
}

export const fetchGoalsFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/goals/')

      //console.log('DATA FROM SERVER====>', data)
      dispatch(getGoals(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const fetchGoals = () => async dispatch => {
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
    //console.log('DATA FROM GOALS=======>', res.data.accounts)
    let goals = res.data.accounts.filter(
      account => account.type === 'depository'
    )
    //&& account.subtype === 'savings'
    //console.log('DEPOSITORY ACCOUNT====>', goals)
    dispatch(getGoals(goals || initialState))
  } catch (err) {
    console.error(err)
  }
}

export const addGoalToServer = goalToAdd => {
  console.log('goal from back ===>', goalToAdd)
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/goals/`)

      console.log('ADD GOAL === DATA FROM SERVER====>', data)
      dispatch(addGoal(goalToAdd))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateGoalToServer = (goalToUpdate, id) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/goals/${id}`)

      console.log('UPDATE GOAL === DATA FROM SERVER====>', data)
      dispatch(updateGoal(goalToUpdate))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GOALS:
      return {...state, allGoals: action.goals}
    case ADD_GOAL:
      return {...state, allGoals: [...state.allGoals, action.goalToAdd]}
    case UPDATE_GOAL:
      if (state.id === action.goalToUpdate.id)
        return {...state, allGoals: action.goalToUpdate}
      else {
        return state
      }
    default:
      return state
  }
}
