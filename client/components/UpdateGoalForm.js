import React from 'react'
import {connect} from 'react-redux'
import {updateGoalToServer, getSingleGoalFromServer} from '../store/goals'

class UpdateGoalForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      name: this.props.goal.name,
      targetAmount: this.props.goal.targetAmount,
      currentAmount: this.props.goal.currentAmount,
      targetDate: this.props.goal.targetDate,
      amountPerMonth: this.props.goal.amountPerMonth
    }
  }
  componentDidMount() {
    let id = this.props.match.params.id
    this.props.getGoal(id)
  }
  handleChange(event) {
    console.log('STATE IN HANDLE CHANGE', this.state)
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    let id = this.props.match.params.id
    let goalToUpdate = this.state
    this.props.updateGoal(id, goalToUpdate)
    this.setState({
      name: '',
      targetAmount: '',
      currentAmount: '',
      targetDate: '',
      amountPerMonth: ''
    })
    this.props.history.push('/goals')
  }
  render() {
    let goal = this.state
    return (
      <div className="form">
        <h3>UPDATE CURRENT GOAL:</h3>
        <form onSubmit={this.handleSubmit}>
          <p>Goal Name:</p>
          <input
            type="text"
            value={goal.name}
            name="name"
            onChange={this.handleChange}
          />
          <p>Target Amount:</p>
          <input
            type="number"
            value={goal.targetAmount}
            name="targetAmount"
            onChange={this.handleChange}
          />
          <p>Current Amount:</p>
          <input
            type="number"
            value={goal.currentAmount}
            name="currentAmount"
            onChange={this.handleChange}
          />
          <p>Target Date:</p>
          {/* date format YYYY-MM-DD  */}
          <input
            type="date"
            value={goal.targetDate}
            name="targetDate"
            onChange={this.handleChange}
          />
          <p>Amount per month:</p>
          <input
            type="number"
            value={goal.amountPerMonth}
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
    goal: state.goals.singleGoal
  }
}
const mapDispatch = dispatch => ({
  updateGoal: (id, goalToUpdate) =>
    dispatch(updateGoalToServer(id, goalToUpdate)),
  getGoal: id => dispatch(getSingleGoalFromServer(id))
})
export default connect(mapState, mapDispatch)(UpdateGoalForm)
