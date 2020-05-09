import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Plaid from './Plaid'

/**
 * COMPONENT
 */
export class Transactions extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3>All Transactions</h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {}
}

export default connect(mapState)(Transactions)
