import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Plaid from './Plaid'
import UserModule from './UserModules'
import Profile from './Profile'
import {UserAccounts} from '.'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className=" float-container">
      <div className="float-child">
        <Profile />
      </div>
      <div className="float-child">
        <img src="/link_accounts.png" height="100" width="100" id="plaidimg" />
        <p />
        <Plaid />
      </div>
      <div className="float-child">
        <UserModule />
      </div>
      <div className="float-child-Acc">
        <UserAccounts />
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
