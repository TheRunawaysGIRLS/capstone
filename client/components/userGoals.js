import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Plaid from './Plaid'
import {fetchGoalsFromServer} from '../store/goals'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

/**
 * COMPONENT
 */
export class UserGoals extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      selectedGoal: '',
      viewAll: true
    }
  }
  componentDidMount() {
    this.props.getGoals()
  }

  handleClick() {
    this.props.getGoals()
  }

  render() {
    console.log(
      'RENDER IN USERGOALS this.props.allAccounts',
      this.props.allGoals
    )
    let goals = this.props.allGoals
    return (
      <div>
        <h2>My Goals</h2>
        <table className="fl-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Target</th>
              <th>Current Amount</th>
              <th>Still need to be saved</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((goal, index) => {
              const current = Number(goal.currentAmount).toFixed(2) / 100
              const target = Number(goal.targetAmount).toFixed(2)
              const amountLeft = (target - current).toFixed(2)
              return (
                <tr name={index} key={index}>
                  <td>{goal.name}</td>
                  <td className="money">{formatter.format(target)}</td>
                  <td className="money">{formatter.format(current)}</td>
                  <td className="money">{formatter.format(amountLeft)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {/* </div> */}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    allGoals: state.goals.allGoals
  }
}
const mapDispatch = (dispatch, state) => {
  return {
    getGoals: () => dispatch(fetchGoalsFromServer())
  }
}

export default connect(mapState, mapDispatch)(UserGoals)
