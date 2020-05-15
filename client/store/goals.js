import axios from 'axios'

const GET_GOALS = 'GET_GOALS'
const GET_SINGLE_GOAL = 'GET_SINGLE_GOAL'
const ADD_GOAL = 'ADD_GOAL'
const UPDATE_GOAL = 'UPDATE_GOAL'
// const DELETE_GOAL = 'DELETE_GOAL'

export const getGoals = goals => {
  return {
    type: GET_GOALS,
    goals
  }
}
export const getSingleGoal = goal => {
  return {
    type: GET_SINGLE_GOAL,
    goal
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
  allGoals: [],
  singleGoal: {}
}

export const fetchGoalsFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/goals/')
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
export const getSingleGoalFromServer = goalId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/goals/${goalId}`)
      dispatch(getSingleGoal(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addGoalToServer = goalToAdd => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/goals/`, goalToAdd)
      console.log('ADD GOAL === DATA FROM SERVER====>', data)
      dispatch(addGoal(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateGoalToServer = goalId => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/goals/${goalId}`)
      console.log('UPDATE GOAL === DATA FROM SERVER====>', data)
      dispatch(fetchGoalsFromServer())
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteGoal = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/goals/${id}`)
      dispatch(fetchGoalsFromServer())
    } catch (err) {
      console.log(err)
    }
  }
}
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_GOALS:
      return {...state, allGoals: action.goals}
    case GET_SINGLE_GOAL:
      return {...state, singleGoal: action.goal}
    case ADD_GOAL:
      return {...state, allGoals: [...state.allGoals, action.goalToAdd]}
    //case UPDATE_GOAL:

    // console.log('STATE FROM UPDATE GAL BACK', state)
    // return state.allGoals.map(goal => {
    //   if (goal.id === action.goalToUpdate.id) {
    //     return action.goalToUpdate
    //   } else {
    //     return goal
    //   }
    // })
    default:
      return state
  }
}
