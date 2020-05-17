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
export const Home = props => {
  const {email} = props

  return (
    <div id="partners">
      <h1>DASHBOARD UNDER CONSTRUCTION</h1>
      <div className="wrap clearfix">
        <h1>WELCOME to your Personal Financial Diary!!</h1>

        <img
          id="logohome"
          src="/mazumalogotr.png"
          height="400"
          width="400"
          id="logo"
        />
        <p />
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

export default connect(mapState)(Home)

/**
 * PROP TYPES
 */
Home.propTypes = {
  email: PropTypes.string
}
