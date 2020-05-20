import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchGoalsFromServer} from '../store/goals'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

export class AllGoals extends Component {
  componentDidMount() {
    this.props.getGoals()
  }
  render() {
    let goals = this.props.allGoals
    return (
      <div className="allgoals">
        <h3>You can keep track of current financial goals and set new ones!</h3>

        <h2>Current Goals:</h2>
        <div className="goals-container">
          {goals.map((goal, index) => {
            const current = Number(goal.currentAmount).toFixed(2) / 100
            const target = Number(goal.targetAmount).toFixed(2)
            const amountLeft = (target - current).toFixed(2)
            return (
              <div key={index} className="all-goals-info">
                <Link to={`/goals/${goal.id}`}>
                  <button id="button">
                    <h3>{goal.name}</h3>
                    Target Amount: {formatter.format(target)}
                    <br />
                    Current Amount: {formatter.format(current)}
                    <br />
                    Still need to be saved: {formatter.format(amountLeft)}
                    <br />
                  </button>
                </Link>
              </div>
            )
          })}
          <br />
        </div>
        <Link to="/addnewgoal">
          <button className="add-goal-button" type="submit">
            ADD NEW GOAL
          </button>
        </Link>
      </div>
    )
  }
}

const mapState = state => {
  return {
    allGoals: state.goals.allGoals
  }
}

const mapDispatch = dispatch => {
  return {
    getGoals: () => dispatch(fetchGoalsFromServer())
  }
}
export default connect(mapState, mapDispatch)(AllGoals)
