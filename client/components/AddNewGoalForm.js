import React from 'react'
import {connect} from 'react-redux'
import {addGoalToServer} from '../store/goals'

class AddNewGoalForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      name: '',
      targetAmount: '',
      currentAmount: '',
      targetDate: '',
      amountPerMonth: ''
    }
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    const goal = this.state
    this.props.addGoalToStore(goal)
    this.setState({
      name: '',
      targetAmount: '',
      currentAmount: '',
      targetDate: '',
      amountPerMonth: ''
    })
  }
  render() {
    return (
      <div>
        <h3>ENTER A NEW GOAL:</h3>
        <form onSubmit={this.handleSubmit}>
          <p>Goal Name:</p>
          <input
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
          />
          <p>Target Amount:</p>
          <input
            type="number"
            value={this.state.targetAmount}
            name="targetAmount"
            onChange={this.handleChange}
          />
          <p>Current Amount:</p>
          <input
            type="number"
            value={this.state.currentAmount}
            name="currentAmount"
            onChange={this.handleChange}
          />
          <p>Target Date:</p>
          {/* date format YYYY-MM-DD  */}
          <input
            type="date"
            value={this.state.targetDate}
            name="targetDate"
            onChange={this.handleChange}
          />
          <p>Amount per month:</p>
          <input
            type="number"
            value={this.state.amountPerMonth}
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
  return {
    allGoals: state.goals.allGoals
  }
}
const mapDispatch = dispatch => ({
  addGoalToStore: goal => dispatch(addGoalToServer(goal))
})
export default connect(mapState, mapDispatch)(AddNewGoalForm)
