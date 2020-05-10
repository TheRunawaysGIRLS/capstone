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
    console.log('componentdidmount')
    this.props.fetchTransactions()
    this.props.fetchAccounts()
  }

  handleClick() {
    console.log('clicked!')
    console.log(this.props, 'this.props')
    this.props.fetchTransactions()
    this.props.fetchAccounts()
  }

  handleAccountClick(e) {
    console.log('account clicked!')
    console.log(this.props, 'this.props')
    console.log(e.target, 'e.target.name')
    this.setState({
      selectedAccount: e.target.name
    })
  }

  render() {
    let allTransactions = this.props.allTransactions
    let allAccounts = this.props.allAccounts

    return (
      <div>
        <button type="submit" onClick={this.handleClick}>
          View All Accounts And Transactions
        </button>
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
              Current Balance: ${account.balances.current}
              <br />
              Available Balance: ${account.balances.available}
              <br />
              Limit: ${account.balances.limit}
            </button>
          )
        })}
        <h3>All Transactions</h3>
        {allTransactions.map(transaction => {
          if (transaction.account_id === this.state.selectedAccount) {
            return (
              <div key={transaction.transaction_id}>{transaction.name}</div>
            )
          }
        })}
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
