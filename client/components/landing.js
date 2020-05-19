import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import AwesomeSliderStyles from 'react-awesome-slider/src/styles';

// 	const Slider = ({ props }) => (
// 		<AwesomeSlider>
// 			<div data-src={require('./assets/icons/s1.jpg')} />
// 			<div data-src={require('./assets/icons/s2.jpg')} />
// 			<div data-src={require('./assets/icons/s3.jpg')} />
// 		</AwesomeSlider>
// 	);
// export default Slider;
/**
 * COMPONENT
 */
export const Landing = props => {
  const {email} = props

  const slider = (
    <AwesomeSlider>
      <div data-src="/index_img_slider-1.jpg" />
      <div data-src="/index_img_slider-2.jpg" />
      <div data-src="/index_img_slider-1.jpg" />
    </AwesomeSlider>
  )

  return <div>{slider}</div>
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
