import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import demoViz from './demoViz'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import allGoalsReduser from './goal'
import transactions from './transactions'
import accounts from './accounts'

const reducer = combineReducers({
  user,
  allGoalsReduser,
  transactions,
  accounts,
  demoViz,
  budgets
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
