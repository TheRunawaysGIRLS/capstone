import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Plaid from './Plaid'
import UserModule from './UserModules'
import Profile from './Profile'

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
        <h1>HERE IS PLAID</h1>
        <Plaid />
      </div>
      <div className="float-child">
        <UserModule />
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
