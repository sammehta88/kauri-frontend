import React from 'react'
import { withApollo, compose } from 'react-apollo'
import { connect } from 'react-redux'
import withData from '../lib/with-data'
import App from '../layouts/App'
import Requests from '../components/containers/Requests'

class AllRequests extends React.Component {
  static async getInitialProps (context, apolloClient) {
    return {}
  }

  render () {
    return (
      <App url={this.props.url}>
        <Requests categoryQuery={this.props.url && this.props.url.query && this.props.url.query.category} />
      </App>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
  connect(state => ({ userId: state.app.userId }), {})
)(AllRequests)
