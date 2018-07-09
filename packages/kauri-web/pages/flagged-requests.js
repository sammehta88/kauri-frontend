import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import Requests from '../components/containers/Requests'

class FlaggedRequests extends React.Component {
  static async getInitialProps (context, apolloClient) {
    return {}
  }

  render () {
    return (
      <App url={this.props.url}>
        <h1>My Flagged Requests</h1>
        <Requests myRequests status='IN_PROGRESS' />
      </App>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo
)(FlaggedRequests)
