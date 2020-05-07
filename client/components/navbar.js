import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div id="nav">
    {isLoggedIn ? (
      <div className="dropMenuBody">
        <nav>
          <ul className="nav-ul">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">
              <img
                src="/mazumamaker.png"
                height="150"
                width="150"
                id="mazumamakerlogo"
              />
            </Link>

            <li className="nav-li">
              <Link to="/home">Home</Link>
            </li>
            <li className="nav-li">
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>
    ) : (
      <div className="topnav">
        <nav>
          <ul className="nav-ul">
            {/* The navbar will show these links before you log in */}
            <Link to="/home">
              <img
                src="/mazumamaker.png"
                height="200"
                width="200"
                id="mazumamakerlogo"
              />
            </Link>
            <li className="nav-li">
              <Link to="/home">Home</Link>
            </li>
            <li className="nav-li">
              <Link to="/login">Login</Link>
            </li>
            <li className="nav-li">
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      </div>
    )}

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
