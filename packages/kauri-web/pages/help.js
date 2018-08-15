import React from 'react'
import { withApollo, compose } from 'react-apollo'
import { connect } from 'react-redux'
import withData from '../lib/with-data'
import { routeChangeAction } from '../lib/Module'
import App from '../layouts/App'
import Community from '../components/connections/Community/index'

const ConnectedCommunity = connect(
  () => ({}),
  { routeChangeAction }
)(Community)

class HelpPage extends React.Component {
  render () {
    return (
      <App url={this.props.url}>
        <ConnectedCommunity routeChangeAction={this.props.routeChangeAction} category={'kauri'} />
      </App>
    )
  }
}

export default compose(
  withData,
  withApollo
)(HelpPage)
