import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleGoalFromServer, deleteGoal} from '../store/goals'

export class SingleGoal extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    let id = this.props.match.params.id
    this.props.getGoal(id)
  }
  render() {
    const goal = this.props.goal
    return (
      <div>
        <h3>{goal.name}</h3>
        <br />
        Target Amount: ${(Number(goal.targetAmount) * 2).toFixed(2)}
        <br />
        <br />
        Current Amount: ${Number(goal.currentAmount).toFixed(2)}
        <br />
        <br />
        Still need to be saved: ${Number(goal.currentAmount).toFixed(2)}
        <br />
        <br />
        <div>
          <Link to="/goals">
            <button id="button" onClick={() => this.props.removeGoal(goal.id)}>
              DELETE
            </button>
          </Link>
          <br />
          <br />
          <Link to={`/goals/${goal.id}/updategoal`}>
            <button id="button">UPDATE</button>
          </Link>
        </div>
      </div>
    )
  }
}
const mapState = state => {
  return {
    goal: state.goals.singleGoal
  }
}
const mapDispatch = dispatch => ({
  getGoal: id => dispatch(getSingleGoalFromServer(id)),
  removeGoal: id => dispatch(deleteGoal(id))
})
export default connect(mapState, mapDispatch)(SingleGoal)
