import React from 'react'
import {connect} from 'react-redux'
import {updateGoalToServer, getSingleGoalFromServer} from '../store/goals'

class UpdateGoalForm extends React.Component {
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
    console.log('STATE IN HANDLE SUBMIT', this.state)
    let id = this.props.match.params.id
    console.log('STATE IN SUBMIT', this.state)
    this.props.updateGoal(id)
  }
  render() {
    console.log('STATE IN HANDLE RENDER', this.props.match.param)
    let goal = this.props.goal
    //console.log('state', this.state)
    //console.log('PROPS FROM RENDER UPDATE====>', this.props.goal)

    return (
      <div>
        <h3>UPDATE CURRENT GOAL:</h3>
        <form onSubmit={this.handleSubmit}>
          <p>Goal Name:</p>
          <input
            type="text"
            defaultValue={goal.name}
            name="name"
            onChange={this.handleChange}
          />
          <p>Target Amount:</p>
          <input
            type="number"
            defaultValue={goal.targetAmount}
            name="targetAmount"
            onChange={this.handleChange}
          />
          <p>Current Amount:</p>
          <input
            type="number"
            defaultValue={goal.currentAmount}
            name="currentAmount"
            onChange={this.handleChange}
          />
          <p>Target Date:</p>
          {/* date format YYYY-MM-DD  */}
          <input
            type="date"
            defaultValue={goal.targetDate}
            name="targetDate"
            onChange={this.handleChange}
          />
          <p>Amount per month:</p>
          <input
            type="number"
            defaultValue={goal.amountPerMonth}
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
  updateGoal: id => dispatch(updateGoalToServer(id)),
  getGoal: id => dispatch(getSingleGoalFromServer(id))
})
export default connect(mapState, mapDispatch)(UpdateGoalForm)
