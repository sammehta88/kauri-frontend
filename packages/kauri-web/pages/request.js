import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import Request from '../components/containers/Request'

class RequestPage extends React.Component {
  static async getInitialProps (context, apolloClient) {
    return {}
  }

  render () {
    return (
      <App url={this.props.url}>
        <Request request_id={this.props.url.query['request_id']} />
      </App>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  withApollo
)(RequestPage)
