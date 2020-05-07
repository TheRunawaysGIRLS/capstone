import React, {Component} from 'react'
import PlaidLink from 'react-plaid-link'
import Axios from 'axios'

export default class Plaid extends Component {
  handleOnSuccess(token, metadata) {
    axios.post('/api/plaid', {
      publicToken: token
    })
    // send token to client server
  }
  handleOnExit() {
    if (err != null) {
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
        publicKey="PLAID_PUBLIC_KEY"
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess}
      >
        Open Link and connect your bank!
      </PlaidLink>
    )
  }
}
