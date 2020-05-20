import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getSingleGoalFromServer, deleteGoal} from '../store/goals'
import {VictoryLabel, VictoryPie} from 'victory'

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
    const current = Number(goal.currentAmount).toFixed(2) / 100
    const target = Number(goal.targetAmount).toFixed(2)
    const amountLeft = Number((target - current).toFixed(2))

    data = [
      {x: 'Currently Saved', y: current},
      {x: 'Still Needed', y: amountLeft}
    ]

    const colors = {
      mzgreen: '#4CB38A',
      mzmagenta: '#8F3B76'
    }

    return (
      <div className="goal-single">
        <div className="single-goal-info">
          <h3>{goal.name}</h3>
          <p>
            Target Amount: ${target}
            <br />
            <br />
            Current Amount: ${current}
            <br />
            <br />
            Still need to be saved: ${amountLeft}
            <br />
            <br />
          </p>
          <div className="goal-buttons">
            <Link to="/goals">
              <button
                id="button"
                onClick={() => this.props.removeGoal(goal.id)}
              >
                DELETE
              </button>
            </Link>
            <Link to={`/goals/${goal.id}/updategoal`}>
              <button id="button">UPDATE</button>
            </Link>
          </div>
        </div>

        <div className="goal-viz">
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
