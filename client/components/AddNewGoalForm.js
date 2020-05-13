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
    console.log('HANDLE CHANGE====>')
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit = event => {
    console.log('HANDLE SUBMIT====>')
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
    console.log('ADD RENDER ---- this.state', this.state)
    return (
      <div>
        <h3>ENTER A NEW GOAL:</h3>
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
  return {
    allGoals: state.goals.allGoals
  }
}
const mapDispatch = dispatch => ({
  addGoalToStore: goal => {
    dispatch(addGoalToServer(goal))
  }
})
export default connect(mapState, mapDispatch)(AddNewGoalForm)
