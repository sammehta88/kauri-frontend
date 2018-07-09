import React from 'react'
import { connect } from 'react-redux'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import RequestCreated from '../components/containers/RequestCreated'

class RequestCreatedPage extends React.Component {
  render () {
    return (
      <App confirmationPage url={this.props.url}>
        <RequestCreated request_id={this.props.url.query && this.props.url.query['request_id']} />
      </App>
    )
  }
}

export default compose(withData, withApollo)(RequestCreatedPage)
