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
  }
  handleSubmit(event) {
    event.preventDefault()
    const goal = {
      name: this.state.name,
      targetAmount: this.state.targetAmount,
      accountName: this.state.accountName,
      currentAmount: currBalance,
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
    let currBalance = 0
    const accounts = this.props.allAccounts.filter(
      account => account.type === 'depository'
    )

    console.log('ACCOUNT IN ADDD', accounts)
    console.log('state in render ADD', this.props)
    if (accounts.length) {
      return (
        <div className="form">
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
            <p>Select Account:</p>
            {/* <select name={`${type}Frequency`} onChange={this.handleChange}> */}

            <select
              name="accountName"
              value={this.state.accountName}
              onChange={this.handleChange}
            >
              {accounts.map(function(account) {
                return <option value={account.name}>{account.name}</option>
              })}
            </select>
            <p>Current Amount:</p>
            {accounts.map(account => {
              //console.log('state',this.state)
              console.log('account', account.name)
              console.log(this.state.accountName)
              if (account.name.includes(this.state.accountName)) {
                currBalance = account.balances.current.toFixed(2)
                this.setState({currentAmount: currBalance})
                console.log('HERE', currBalance)
              }
            })}

            <input
              type="number"
              value={console.log('state', this.state, currentAmount)}
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
    } else {
      return <div>wait</div>
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
