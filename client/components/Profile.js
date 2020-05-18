import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/singleUser'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
class Profile extends React.Component {
  componentDidMount() {
    this.props.getUser()
  }

  render() {
    let user
    if (this.props.user) {
      user = this.props.user
    }
    console.log(this.props)

    return (
      <div>
        <main>
          <center>
            {user ? (
              <div>
                <h1 className="m-5">Welcome! {user.firstName}!</h1>
                <h3>Your Profile</h3>
                <p>{user.firstName + ' ' + user.lastName}</p>
                <p>{user.email}</p>
                <p>{user.address}</p>
                <Link
                  to={{
                    pathname: '/EditProfile',
                    state: {
                      firstName: user.firstName,
                      lastName: user.lastName,
                      email: user.email,
                      address: user.address
                    }
                  }}
                >
                  <button type="button" id="button">
                    Edit Profile
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <p />
                <Link to="/login">Login</Link>
              </div>
            )}
          </center>
        </main>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}
const mapDispatch = dispatch => ({
  getUser: user => dispatch(me(user))
})

export default connect(mapState, mapDispatch)(Profile)
