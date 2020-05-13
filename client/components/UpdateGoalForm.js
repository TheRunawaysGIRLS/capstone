import React from 'react'
import {connect} from 'react-redux'
import {updateGoalToServer} from '../store/goals'

class UpdateGoalForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      // name: props.goal.name,
      // targetAmount: props.goal.targetAmount,
      // currentAmount: props.goal.currentAmount,
      // targetDate: props.goal.targetDate,
      // amountPerMonth: props.goal.amountPerMonth
    }
  }
  handleChange(event) {
    console.log('STATE FROM UPDATE ====>', this.state)
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = event => {
    const goal = this.state
    event.preventDefault()
    this.props.updateGoalToStore(goal)
  }
  render() {
    const {goal} = this.props
    console.log('GOAL FROM RENDER UPDATE====>', this.props)
    return (
      <div>
        <h3>UPDATE CURRENT GOAL:</h3>
        <form onSubmit={this.handleSubmit}>
          <p>Goal Name:</p>
          <input type="text" name="name" onChange={this.handleChange} />
          <p>Target Amount:</p>
          <input
            type="number"
            name="targetAmount"
            onChange={this.handleChange}
          />
          <p>Current Amount:</p>
          <input
            type="number"
            name="currentAmount"
            onChange={this.handleChange}
          />
          <p>Target Date:</p>
          {/* date format YYYY-MM-DD  */}
          <input type="date" name="targetDate" onChange={this.handleChange} />
          <p>Amount per month:</p>
          <input
            type="number"
            name="amountPerMonth"
            onChange={this.handleChange}
          />
          <p>
            <button id="button" type="submit">
              SUBMIT
            </button>
          </p>
        </form>
      </div>
    )
  }
}
const mapState = state => {
  console.log('STATE FROM MAP UPDATE===>', state)
  return {
    allGoals: state.goals.allGoals
  }
}
const mapDispatch = dispatch => ({
  updateGoalToStore: goal => {
    dispatch(updateGoalToServer(goal))
  }
})
export default connect(mapState, mapDispatch)(UpdateGoalForm)
