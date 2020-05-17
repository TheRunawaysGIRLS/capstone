import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Plaid from './Plaid'
import UserModule from './UserModules'
import Profile from './Profile'
import {UserAccounts} from '.'
import {SpendCatPie} from '.'

/**
 * COMPONENT
 */
export const Home = props => {
  const {email} = props

  return (
    <div id="partners">
      <h1>WELCOME to your Personal Financial Diary!!</h1>
      <p />
      <div className="wrap clearfix">
        <h2>MY DASHBOARD</h2>

        <div className="parent-flex">
          <Link to="/categories">
            <SpendCatPie />
          </Link>
          <Link to="/categories">
            <SpendCatPie />
          </Link>

          <Link to="/transactions">
            <UserAccounts />
          </Link>
        </div>
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
