import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchGoalsFromServer} from '../store/goals'

export class AllGoals extends Component {
  componentDidMount() {
    this.props.getGoals()
  }
  render() {
    let goals = this.props.allGoals
    //console.log('RENDER ALL GOALS', goals)
    return (
      <div>
        <h3>ALL GOALS</h3>
        <div className="goals-container">
          {goals.map((goal, index) => {
            const current = Number(goal.currentAmount).toFixed(2)
            const target = Number(goal.targetAmount).toFixed(2)
            const amountLeft = target - current
            return (
              <div key={index}>
                <Link to={`/goals/${goal.id}`}>
                  <button id="button">
                    {goal.name}
                    <br />
                    Target Amount: ${target}
                    <br />
                    <br />
                    Current Amount: ${current}
                    <br />
                    <br />
                    Still need to be saved: ${amountLeft}
                    <br />
                    <br />
                  </button>
                </Link>
              </div>
            )
          })}
        </div>
        <br />
        <Link to="/addnewgoal">
          <button id="button" type="submit">
            ADD NEW GOAL
          </button>
        </Link>
      </div>
    )
  }
}

const mapState = state => {
  //console.log('STATE FROM MAP', state)
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
