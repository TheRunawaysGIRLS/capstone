import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Plaid from './Plaid'
import UserModule from './UserModules'
import Profile from './Profile'
import {UserAccounts} from '.'
import {SpendCatPie} from '.'
import {UserGoals} from '.'
import {GoalCompareChart} from '.'

/**
 * COMPONENT
 */
export const Home = props => {
  const {email} = props

  return (
    <div className="user-dashboard">
      <img id="landingimg" src="/dashboardbannertr.png" />
      <div className="float-container">
        <div className="float-child">
          <Link to="/transactions">
            <UserAccounts />
          </Link>
        </div>

        <div className="float-child">
          <Link to="/categories">
            <SpendCatPie />
          </Link>
        </div>
        <div className="float-child">
          <Link to="/goals">
            <UserGoals />
          </Link>
        </div>
        <div className="float-child">
          <Link to="/goals">
            <GoalCompareChart />
          </Link>
        </div>
      </div>

      {/* <div className="category-transactions">
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
		<div className="dashboard-transactions">
			<Link to="/goals">
				<UserGoals />
			</Link>
		</div>
        </div>
      </div> */}
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
