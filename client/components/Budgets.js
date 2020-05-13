import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Plaid from './Plaid'
import {fetchTransactions} from '../store/transactions'
import {fetchAccounts} from '../store/accounts'

/**
 * COMPONENT
 */
export class Budgets extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      name: '',
      description: '',
      type: '',
      amount: '',
      frequency: ''
    }
  }

  handleClick() {
    console.log('clicked!')
  }

  handleSubmit() {
    console.log('submitted!')
  }

  render() {
    return (
      <div className="budget-container">
        <div className="all-budgets">
          <h3>Income</h3>
          <form>
            <div>
              <label htmlFor="description">
                <small>Description</small>
              </label>
              <input name="description" type="text" />
            </div>
            <div>
              <label htmlFor="amount">
                <small>Amount</small>
              </label>
              <input name="amount" type="text" />
            </div>
            <div>
              <label htmlFor="frequency">
                <small>Frequency</small>
              </label>
              <select>
                <option value="monthly">monthly</option>
                <option value="bi-weekly">bi-weekly</option>
                <option value="weekly">weekly</option>
                <option value="daily">daily</option>
                <option value="one-time">one-time</option>
              </select>
            </div>
            <button className="budget-submit" type="submit" name="budget">
              Add Income
            </button>
          </form>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    allTransactions: state.transactions.allTransactions,
    allAccounts: state.accounts.allAccounts
  }
}
const mapDispatch = (dispatch, state) => {
  return {
    fetchTransactions: () => dispatch(fetchTransactions()),
    fetchAccounts: () => dispatch(fetchAccounts())
  }
}

export default connect(mapState, mapDispatch)(Budgets)
