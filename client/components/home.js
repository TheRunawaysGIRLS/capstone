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
    <div className="user-dashboard">
      <h1>WELCOME to your Personal Financial Diary!!</h1>
      <p />
      <h2>MY DASHBOARD</h2>

      <div className="category-transactions">
        <div className="dashboard-container">
          <div className="dashboard-transactions">
            <Link to="/transactions">
              <UserAccounts />
            </Link>
          </div>
          <div className="dashboard-section">
            <Link to="/categories">
              <SpendCatPie />
            </Link>
          </div>
          <div className="dashboard-section">
            <Link to="/categories">
              <SpendCatPie />
            </Link>
          </div>
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
