import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleGoalFromServer, deleteGoal} from '../store/goals'
import {VictoryLabel, VictoryPie} from 'victory'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

let data

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
    const current = Number(goal.currentAmount / 100).toFixed(2)
    const target = Number(goal.targetAmount / 1).toFixed(2)
    const amountLeft = Number((target - current).toFixed(2))

    data = [{x: 'Saved', y: current}, {x: 'Still Needed', y: amountLeft}]

    const colors = {
      mzgreen: '#4CB38A',
      mzmagenta: '#8F3B76'
    }

    return (
      <div className="goal-single">
        <div className="single-goal-info">
          <h3>{goal.name}</h3>
          <p>
            Target Amount: {formatter.format(target)}
            <br />
            Current Amount: {formatter.format(current)}
            <br />
            Still need to be saved: {formatter.format(amountLeft)}
            <br />
          </p>
          <div className="goal-buttons">
            <Link to="/goals">
              <button
                className="delete-goal-button"
                onClick={() => this.props.removeGoal(goal.id)}
              >
                DELETE
              </button>
            </Link>
            <Link to={`/goals/${goal.id}/updategoal`}>
              <button className="update-goal-button">UPDATE</button>
            </Link>
          </div>
        </div>

        <div className="goal-viz">
          <h3>Current Progress:</h3>
          <VictoryPie
            colorScale={[colors.mzgreen, colors.mzmagenta]}
            data={data}
            width={350}
            height={350}
            padding={0}
            innerRadius={75}
            labelRadius={95}
            padAngle={2}
            labels={({datum}) => datum.y}
            labelComponent={<VictoryLabel text={({datum}) => datum.x} />}
          />
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
