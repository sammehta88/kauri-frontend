import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import AppWithoutNavbar from '../layouts/AppWithoutNavbar'
import CreateRequestForm from '../components/containers/CreateRequestForm'
import { Helmet } from 'react-helmet'

class CreateRequest extends React.Component {
  static async getInitialProps (context, apolloClient) {
    return {}
  }

  render () {
    return (
      <AppWithoutNavbar url={this.props.url}>
        <Helmet>
          <title>Create Request</title>
        </Helmet>
        <CreateRequestForm />
      </AppWithoutNavbar>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo
)(CreateRequest)
