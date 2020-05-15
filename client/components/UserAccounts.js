import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Plaid from './Plaid'
import {fetchAccounts} from '../store/accounts'

/**
 * COMPONENT
 */
export class UserAccounts extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      selectedAccount: '',
      viewAll: true
    }
  }
  componentDidMount() {
    this.props.fetchAccounts()
  }

  handleClick() {
    this.props.fetchAccounts()
  }

  render() {
    console.log(
      'RENDER IN USERMODULES this.props.allAccounts',
      this.props.allAccounts
    )
    let allAccounts = this.props.allAccounts
    return (
      <div>
        <div>
          <h1>Linked Accounts</h1>
          <p />

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
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    allAccounts: state.accounts.allAccounts
  }
}
const mapDispatch = (dispatch, state) => {
  return {
    fetchAccounts: () => dispatch(fetchAccounts())
  }
}

export default connect(mapState, mapDispatch)(UserAccounts)
