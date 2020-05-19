import React from 'react'
import {connect} from 'react-redux'
import {updateGoalToServer, getSingleGoalFromServer} from '../store/goals'
import {fetchAccounts} from '../store/accounts'

class UpdateGoalForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      name: this.props.goal.name,
      targetAmount: this.props.goal.targetAmount,
      currentAmount: Number(this.props.currentAmount) / 100,
      targetDate: this.props.goal.targetDate,
      amountPerMonth: this.props.goal.amountPerMonth,
      userId: this.props.userId
    }
  }
  componentDidMount() {
    this.props.fetchAccounts()
    let id = this.props.match.params.id
    this.props.getGoal(id)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    let id = this.props.match.params.id
    let goalToUpdate = {
      name: this.state.name,
      targetAmount: this.state.targetAmount,
      accountName: this.state.accountName,
      currentAmount: Number(this.state.currentAmount) * 100,
      targetDate: this.state.targetDate,
      amountPerMonth: this.state.amountPerMonth,
      userId: this.props.userId
    }
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
    const accounts = this.props.allAccounts.filter(
      account => account.type === 'depository'
    )
    if (accounts.length) {
      return (
        <div className="formGoal">
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
            <p>Select Account:</p>
            <select
              name="accountName"
              value={this.state.accountName}
              onChange={this.handleChange}
            >
              {accounts.map(function(account, index) {
                return (
                  <option key={index} value={account.name}>
                    {account.name}
                  </option>
                )
              })}
            </select>
            <p>Current Amount:</p>
            {accounts.map(account => {
              if (account.name.includes(this.state.accountName)) {
                this.setState({
                  currentAmount: account.balances.current.toFixed(2)
                })
              }
            })}

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
    } else {
      return (
        <div className="info">Be patient! I'm pulling up your information!</div>
      )
    }
  }
}
const mapState = state => {
  return {
    goal: state.goals.singleGoal,
    userId: state.user.id,
    allAccounts: state.accounts.allAccounts
  }
}
const mapDispatch = dispatch => ({
  fetchAccounts: () => dispatch(fetchAccounts()),
  updateGoal: (id, goalToUpdate) =>
    dispatch(updateGoalToServer(id, goalToUpdate)),
  getGoal: id => dispatch(getSingleGoalFromServer(id))
})
export default connect(mapState, mapDispatch)(UpdateGoalForm)
