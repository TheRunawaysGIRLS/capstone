import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const Landing = props => {
  const {email} = props

  return (
    <div>
      {/* <img src="/index_img_slider-1.jpg" width="460" height="345"></img> */}
      <Link to="/signup">
        <img id="landingimg" src="/portal1.png" />
      </Link>
      <img id="landingimg" src="/portal2.png" />
      <img id="landingimg" src="/portal3.png" />
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

export default connect(mapState)(Landing)

/**
 * PROP TYPES
 */
Landing.propTypes = {
  email: PropTypes.string
}
