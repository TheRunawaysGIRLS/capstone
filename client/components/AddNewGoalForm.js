import React from 'react'
import {connect} from 'react-redux'
import {addGoalToServer} from '../store/goals'
import {fetchAccounts} from '../store/accounts'

class AddNewGoalForm extends React.Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state = {
      name: '',
      targetAmount: '',
      accountName: '',
      currentAmount: '',
      targetDate: '',
      amountPerMonth: '',
      userId: ''
    }
  }
  componentDidMount() {
    this.props.fetchAccounts()
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    if (event.target.name === 'accountName') {
      const accounts = this.props.allAccounts
      accounts.map(account => {
        if (account.name.includes(this.state.accountName)) {
          this.setState({
            currentAmount: account.balances.current.toFixed(2)
          })
        }
      })
    }
  }
  handleSubmit(event) {
    event.preventDefault()
    const goal = {
      name: this.state.name,
      targetAmount: this.state.targetAmount,
      accountName: this.state.accountName,
      currentAmount: Number(this.state.currentAmount) * 100,
      targetDate: this.state.targetDate,
      amountPerMonth: this.state.amountPerMonth,
      userId: this.props.userId
    }

    this.props.addGoalToStore(goal)
    this.setState({
      name: '',
      targetAmount: '',
      accountName: '',
      currentAmount: '',
      targetDate: '',
      amountPerMonth: '',
      userId: ''
    })
    this.props.history.push('/goals')
  }
  render() {
    const accounts = this.props.allAccounts.filter(
      account => account.type === 'depository'
    )
    if (accounts.length) {
      return (
        <div className="form-container">
          <h3>Enter New Goal:</h3>
          <div className="formGoal">
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
              <p>Select Account:</p>
              <select
                name="accountName"
                value={this.state.accountName}
                onChange={this.handleChange}
              >
                {' '}
                <option value="choose the account" />
                {accounts.map(function(account, index) {
                  return (
                    <option key={index} value={account.name}>
                      {account.name}
                    </option>
                  )
                })}
              </select>
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
                <button className="submit-goal-button" type="submit">
                  SUBMIT
                </button>
              </p>
            </form>
          </div>
        </div>
      )
    } else {
      return (
        <p className="loading">
          <img src="/loading.gif" />
        </p>
      )
    }
  }
}
const mapState = state => {
  return {
    allGoals: state.goals.allGoals,
    allAccounts: state.accounts.allAccounts,
    userId: state.user.id
  }
}
const mapDispatch = dispatch => ({
  addGoalToStore: goal => dispatch(addGoalToServer(goal)),
  fetchAccounts: () => dispatch(fetchAccounts())
})
export default connect(mapState, mapDispatch)(AddNewGoalForm)
