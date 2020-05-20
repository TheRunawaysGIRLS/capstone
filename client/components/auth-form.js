import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store/singleUser'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props

  // if (props.location.state) {
  // 	const { address, email, firstName, lastName } = props.location.state
  // }
  console.log('PROPS FROM AUTHFROM: ', props)
  console.log('props.location.state FROM AUTHFROM: ', props.location.state)
  // console.log('props.location.state deconstructed FROM AUTHFROM: ', props.location.state.address)

  let loginEmail
  let loginButtons
  if (displayName === 'Login') {
    loginButtons = (
      <span>
        <li>
          <Link to="/auth/google">
            <button id="buttonform">
              {displayName.toUpperCase()} WITH GOOGLE
            </button>
          </Link>
          <button id="buttonform" type="submit">
            {displayName}
          </button>
        </li>
      </span>
    )
    loginEmail = (
      <span className="flex-outer">
        <li>
          <label htmlFor="email">Email</label>
          <input name="email" type="text" />
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" />
        </li>
      </span>
    )
  }

  let signUpForm
  let signUpEmail
  let signupButtons
  if (displayName === 'Sign Up') {
    signUpEmail = (
      <span className="flex-outer">
        <li>
          <label htmlFor="email">Email</label>
          <input name="email" type="text" />
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" />
        </li>
      </span>
    )

    signupButtons = (
      <span>
        <li>
          <Link to="/auth/google">
            <button id="buttonform">
              {displayName.toUpperCase()} WITH GOOGLE
            </button>
          </Link>
          <button id="buttonform" type="submit">
            {displayName}
          </button>
        </li>
      </span>
    )

    signUpForm = (
      <span className="flex-outer">
        <li>
          <label htmlFor="firstName">First Name</label>
          <input name="firstName" type="text" />
        </li>
        <li>
          <label htmlFor="lastName">Last Name</label>
          <input name="lastName" type="text" />
        </li>
        <li>
          <label htmlFor="address">Address</label>
          <input name="address" type="text" />
        </li>
      </span>
    )
  }

  //let goal = this.state

  let EditProfileForm
  let EditProfileEmail
  let EditProfileEmailValue
  let EditProfileButtons
  if (displayName === 'Edit Profile') {
    EditProfileEmailValue = props.location.state.email

    EditProfileEmail = (
      <span className="flex-outer">
        <li>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="text"
            value={props.location.state.email}
            disabled="disabled"
          />
        </li>
      </span>
    )

    EditProfileButtons = (
      <span>
        <li>
          <button id="buttonform" type="submit">
            {'Summit'}
          </button>
        </li>
      </span>
    )

    EditProfileForm = (
      <span className="flex-outer">
        <li>
          <label htmlFor="firstName">First Name</label>
          {/* <input name="firstName" type="text" defaultValue={firstName} /> */}
          <input
            name="firstName"
            type="text"
            defaultValue={props.location.state.firstName}
          />
        </li>
        <li>
          <label htmlFor="lastName">Last Name</label>
          <input
            name="lastName"
            type="text"
            defaultValue={props.location.state.lastName}
          />
        </li>
        <li>
          <label htmlFor="address">Address</label>
          <input
            name="address"
            type="text"
            defaultValue={props.location.state.address}
          />
        </li>
      </span>
    )
  }

  return (
    <main className="form">
      <div className="wrapper">
        <div className="container">
          <h2 className="headercenter">{displayName.toUpperCase()} FORM</h2>
          <form onSubmit={handleSubmit} name={name}>
            <ul className="flex-outer">
              {loginEmail}
              {signUpEmail}
              {EditProfileEmail}

              {signUpForm}
              {EditProfileForm}

              {loginButtons}
              {signupButtons}
              {EditProfileButtons}

              {error && error.response && <div> {error.response.data} </div>}
            </ul>
          </form>
        </div>
      </div>
    </main>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapEditProfile = state => {
  return {
    name: 'EditProfile',
    displayName: 'Edit Profile',
    error: state.user.error
  }
}

const mapLoginDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

const mapEditProfileDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = 'EditProfile'
      const email = evt.target.email.value
      const password = 'nopassword'
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const address = evt.target.address.value
      dispatch(auth(email, password, firstName, lastName, address, formName))
    }
  }
}

const mapSignupDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const address = evt.target.address.value
      dispatch(auth(email, password, firstName, lastName, address, formName))
    }
  }
}

export const Login = connect(mapLogin, mapLoginDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapSignupDispatch)(AuthForm)
export const EditProfile = connect(mapEditProfile, mapEditProfileDispatch)(
  AuthForm
)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
