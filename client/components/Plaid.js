import React, {Component} from 'react'
import {PlaidLink} from 'react-plaid-link'
import Axios from 'axios'

class Plaid extends Component {
  constructor(props) {
    super(props)
    this.handleOnExit = this.handleOnExit.bind(this)
    this.handleOnSuccess = this.handleOnSuccess.bind(this)
  }
  handleOnSuccess(token, metadata) {
    Axios.post('/api/plaid', {
      publicToken: token
    })
    // send token to client server
  }
  handleOnExit() {
    if (err !== null) {
      // The user encountered a Plaid API error prior to exiting.
    }
    console.log('EXIT---->')
    // handle the case when your user exits Link
  }
  render() {
    return (
      <PlaidLink
        clientName="MAZUMA MAKER"
        env="sandbox"
        product={['auth', 'transactions']}
        publicKey="1829210b543a6a8da40a0ca0ed6b62"
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess}
      >
        <button id="button">Open Link and connect your bank!</button>
      </PlaidLink>
    )
  }
}

export default Plaid
