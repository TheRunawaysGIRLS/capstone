import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Plaid from './Plaid'
import {fetchAccounts} from '../store/accounts'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

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
    let allAccounts = this.props.allAccounts
    return (
      <div>
        {/* <div className="table-wrapper"> */}
        <h2>Linked Accounts</h2>
        <table className="fl-table">
          <thead>
            <tr>
              <th>Account</th>
              <th>Current Balance</th>
              <th>Available Balance</th>
              <th>Limit</th>
            </tr>
          </thead>
          <tbody>
            {allAccounts.map(account => {
              return (
                <tr name={account.account_id} key={account.account_id}>
                  <td>{account.name}</td>
                  <td className="money">
                    {formatter.format(account.balances.current)}
                  </td>
                  <td className="money">
                    {formatter.format(account.balances.available)}
                  </td>
                  <td className="money">
                    {formatter.format(account.balances.limit)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {/* </div> */}
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
