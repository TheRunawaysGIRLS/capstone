import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Plaid from './Plaid'
import {fetchTransactions} from '../store/transactions'
import {fetchAccounts} from '../store/accounts'

/**
 * COMPONENT
 */
export class Transactions extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleAccountClick = this.handleAccountClick.bind(this)
    this.state = {
      selectedAccount: ''
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
      selectedAccount: e.target.name
    })
  }

  render() {
    let allTransactions = this.props.allTransactions
    let allAccounts = this.props.allAccounts

    return (
      <div className="account-transactions">
        {/* <button type="submit" onClick={this.handleClick}>
          View All Accounts And Transactions
        </button> */}
        <div className="all-accounts">
          <h3>All Accounts</h3>
          {allAccounts.map(account => {
            return (
              <button
                className="account-button"
                type="submit"
                name={account.account_id}
                key={account.account_id}
                onClick={this.handleAccountClick}
              >
                {}
                {account.name}
                <br />
                Current Balance: ${Number(account.balances.current).toFixed(2)}
                <br />
                Available Balance: ${Number(account.balances.available).toFixed(
                  2
                )}
                <br />
                Limit: ${Number(account.balances.limit).toFixed(2)}
              </button>
            )
          })}
        </div>
        <div className="all-transactions">
          <h3>Transactions:</h3>
          <table>
            <tbody>
              <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Description</th>
              </tr>
              {allTransactions.map(transaction => {
                if (transaction.account_id === this.state.selectedAccount) {
                  return (
                    <tr key={transaction.transaction_id}>
                      <td>${transaction.amount}</td>
                      <td>{transaction.category}</td>
                      <td>{transaction.name}</td>
                    </tr>
                  )
                }
              })}
            </tbody>
          </table>
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

export default connect(mapState, mapDispatch)(Transactions)
