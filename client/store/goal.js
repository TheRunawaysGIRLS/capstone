import axios from 'axios'

const GET_GOALS = 'GET_GOALS'

const getGoals = goals => {
  return {
    type: GET_GOALS,
    goals
  }
}

const initialState = {
  all: []
}

export const fetchGoalsFromServer = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/goals')
      dispatch(getGoals(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export default function allGoalsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GOALS:
      return {...state, all: action.goals}
    default:
      return state
  }
}
