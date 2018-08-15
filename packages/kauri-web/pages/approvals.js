import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import Approvals from '../components/containers/Approvals'
import { withRouter } from 'next/router';

class ApprovalsPage extends React.Component {
  static async getInitialProps(context, apolloClient) {
    return {}
  }

  render() {
    return (
      <App url={this.props.router}>
        <Approvals defaultTab={this.props.router.query && this.props.router.query.tab} />
      </App>
    )
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(ApprovalsPage)
