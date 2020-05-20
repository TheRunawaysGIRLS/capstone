import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import UserNavBar from './UserNavBar'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Link to="/">
      <div className="top-nav">
        <img src="/logohoriz.png" id="title" />
      </div>
    </Link>

    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}

          <Link to="/home">
            <span className="tooltip">
              <img src="/home.png" id="buttonhome" className="tooltip" />
              <span className="tooltiptext">Home</span>
            </span>
          </Link>
          {/* <Link to="/DataViz">
            <button id="button">DATA VIZ</button>
          </Link> */}
          <UserNavBar />

          <Link to="/settings">
            <span className="tooltip">
              <img src="/settings.png" id="buttonicon" />
              <span className="tooltiptext">Settings</span>
            </span>
          </Link>

          {/* <Link to="/profile">
			<img src="/profilemaz.png" id="buttonicon" />
          </Link> */}

          <span className="tooltip">
            <img src="/logout.png" id="buttonlogout" onClick={handleClick} />
            <span className="tooltiptext">Logout</span>
          </span>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}

          <Link to="/login">
            <span className="tooltip">
              <img src="/login.png" id="buttonlogin" />
              <span className="tooltiptext">login</span>
            </span>
          </Link>

          <Link to="/signup">
            <button id="button">Sign Up</button>
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
