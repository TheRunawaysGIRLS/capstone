import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Transactions,
  BudgetsByCategory,
  DataViz
} from './components'

import {me} from './store'
import AllGoals from './components/AllGoals'
import UpdateGoalForm from './components/UpdateGoalForm'
import AddNewGoalForm from './components/AddNewGoalForm'
import SingleGoal from './components/SingleGoal'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/goals" component={AllGoals} />
            <Route exact path="/goals/:id" component={SingleGoal} />
            <Route exact path="/DataViz" component={DataViz} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/budgets" component={BudgetsByCategory} />
            <Route
              exact
              path="/goals/:id/updategoal"
              component={UpdateGoalForm}
            />
            <Route exact path="/addnewgoal" component={AddNewGoalForm} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
