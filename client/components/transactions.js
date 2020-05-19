import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Plaid from './Plaid'
import {fetchTransactions} from '../store/transactions'
import {fetchAccounts} from '../store/accounts'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

/**
 * COMPONENT
 */
export class Transactions extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleAccountClick = this.handleAccountClick.bind(this)
    this.handleAllClick = this.handleAllClick.bind(this)
    this.state = {
      selectedAccount: '',
      viewAll: true
    }
  }
  componentDidMount() {
    this.props.fetchTransactions()
    this.props.fetchAccounts()
  }

  handleClick() {
    this.props.fetchTransactions()
    this.props.fetchAccounts()
  }

  handleAccountClick(e) {
    this.setState({
      selectedAccount: e.target.name,
      viewAll: false
    })
  }

  handleAllClick(e) {
    this.setState({
      viewAll: true
    })
  }

  render() {
    let allTransactions = this.props.allTransactions
    let allAccounts = this.props.allAccounts

    if (allAccounts.length) {
      return (
        <div className="account-transactions">
          {/* <button type="submit" onClick={this.handleClick}>
            View All Accounts And Transactions
          </button> */}
          <div className="all-accounts">
            <button
              className="account-button"
              type="submit"
              name="all"
              onClick={this.handleAllClick}
            >
              View All Transactions
            </button>
            {allAccounts.map(account => {
              return (
                <button
                  className="account-button"
                  type="submit"
                  name={account.account_id}
                  key={account.account_id}
                  onClick={this.handleAccountClick}
                >
                  {account.name}
                </button>
              )
            })}
          </div>
          <div className="all-transactions">
            <div className="account-details">
              {!this.state.viewAll &&
                allAccounts.map(account => {
                  if (account.account_id === this.state.selectedAccount) {
                    return (
                      <div key={account.account_id}>
                        <h3>Account Details:</h3>
                        <table className="fl-table">
                          <thead>
                            <th>Account Name</th>
                            <th>Current Balance</th>
                            <th>Available Balance</th>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="account-name">{account.name}</td>
                              <td className="money">
                                {formatter.format(account.balances.current)}
                              </td>
                              <td className="money">
                                ${Number(account.balances.available).toFixed(2)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )
                  }
                })}
            </div>
            <h3>Transactions:</h3>
            <table className="fl-table">
              <thead>
                <tr>
                  <th className="transaction-date">Date</th>
                  <th className="transaction-category">Category</th>
                  <th className="transaction-description">Description</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {this.state.viewAll &&
                  allTransactions.map(transaction => {
                    return (
                      <tr
                        className="transaction-date"
                        key={transaction.transaction_id}
                      >
                        <td>{transaction.date}</td>
                        <td className="transaction-category">
                          {transaction.category[1]}
                        </td>
                        <td className="transaction-description">
                          {transaction.name}
                        </td>
                        <td className="money">
                          {formatter.format(transaction.amount)}
                        </td>
                      </tr>
                    )
                  })}
                {!this.state.viewAll &&
                  allTransactions.map(transaction => {
                    if (transaction.account_id === this.state.selectedAccount) {
                      return (
                        <tr key={transaction.transaction_id}>
                          <td className="transaction-date">
                            {transaction.date}
                          </td>
                          <td className="transaction-category">
                            {transaction.category[1]}
                          </td>
                          <td className="transaction-description">
                            {transaction.name}
                          </td>
                          <td className="money">
                            {formatter.format(transaction.amount)}
                          </td>
                        </tr>
                      )
                    }
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )
    } else {
      return <div>Connect an account to view transactions!</div>
    }
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

export default connect(mapState, mapDispatch)(Transactions)
