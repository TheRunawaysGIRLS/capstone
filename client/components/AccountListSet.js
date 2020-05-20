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
export class AccountsListSet extends React.Component {
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
        {/* <div className="table-wrapper"> */}
        <h2>Linked Accounts</h2>
        <table className="fl-table">
          <thead>
            <tr>
              <th>Accounts</th>
            </tr>
          </thead>
          <tbody>
            {allAccounts.map(account => {
              return (
                // <tr name={account.account_id} key={account.account_id}>
                <td key={account.account_id}> {account.name}</td>

                // </tr>
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

export default connect(mapState, mapDispatch)(AccountsListSet)
