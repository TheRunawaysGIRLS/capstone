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
        {goals.map((goal, index) => {
          return (
            <div key={index}>
              {goal.name}
              <br />
              Target Amount: ${(Number(goal.targetAmount) * 2).toFixed(2)}
              <br />
              <br />
              Current Amount: ${Number(goal.currentAmount).toFixed(2)}
              <br />
              <br />
              Still need to be saved: $
              {Number(goal.currentAmount).toFixed(2)}
              <br />
              <br />
              <Link to="/goals/:id/updategoal">
                <button
                  id="button"
                  // type="submit"
                >
                  UPDATE
                </button>
              </Link>
            </div>
          )
        })}
        <br />
        <Link to="/goals/addnewgoal">
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
