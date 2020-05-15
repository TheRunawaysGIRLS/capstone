import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import UserNavBar from './UserNavBar'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>MAZUMA MAKER</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">
            <button id="button">HOME</button>
          </Link>
          <Link to="/goals">
            {' '}
            <button id="button">GOALS</button>
          </Link>
          <Link to="/DataViz">
            <button id="button">DATA VIZ</button>
          </Link>
          {/* <a href="#" onClick={handleClick}>LOGOUT */}
          {/* </a> */}
          <button id="button" onClick={handleClick}>
            LOGOUT
          </button>
          <UserNavBar />
          <Link to="/transactions">All Transactions</Link>
          <Link to="/categories">Spending By Category</Link>
          <Link to="/budgets">Budgeting Tool</Link>
          <Link to="/allgoals">All goals</Link>
          <Link to="/DataViz">DataVizDemo</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/profile">My Profile</Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">
            <button id="button">LOGIN</button>
          </Link>
          <Link to="/signup">
            <button id="button">SIGN UP</button>
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
