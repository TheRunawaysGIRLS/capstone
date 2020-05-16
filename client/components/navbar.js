import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import UserNavBar from './UserNavBar'

import './navbar.css'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav className="nav-bar">
      {/* img logo */}
      <h1 className="logo">MAZUMA MAKER</h1>
      {isLoggedIn ? (
        <div className="nav-bar-style">
          {/* The navbar will show these links after you log in */}

          <Link to="/home">
            <button id="button">HOME</button>
          </Link>
          <Link to="/DataViz">
            <button id="button">DATA VIZ</button>
          </Link>

          <Link to="/settings">
            <button id="button">Settings</button>
          </Link>
          <Link to="/profile">
            <button id="button">My Profile</button>
          </Link>
          <Link>
            <button id="button" onClick={handleClick}>
              LOGOUT
            </button>
          </Link>
          <UserNavBar />
        </div>
      ) : (
        <div className="nav-bar-style">
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
