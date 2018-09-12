import React from 'react'
import { withApollo, compose } from 'react-apollo'
import { connect } from 'react-redux'
import withData from '../lib/with-data'
import App from '../layouts/App'
import Community from '../components/connections/Community/Community_Connection.bs'
import { withRouter } from 'next/router';

const ConnectedCommunity = connect((state) => ({ hostName: state.app && state.app.hostName }))(Community)

class TopicsPage extends React.Component {
  render () {
    return (
      <App url={this.props.router}>
        <ConnectedCommunity hostName={this.props.hostName} category={this.props.router && this.props.router.query['category']} />
      </App>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  withApollo,
  withRouter,
)(TopicsPage)
