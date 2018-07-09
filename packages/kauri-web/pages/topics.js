import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import Topics from '../components/containers/Topics'

class TopicsPage extends React.Component {
  render () {
    return (
      <App url={this.props.url}>
        <Topics url={this.props.url} />
      </App>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo
)(TopicsPage)
