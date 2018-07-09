import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import AppWithoutNavbar from '../layouts/AppWithoutNavbar'
import SubmitArticleForm from '../components/containers/SubmitArticleForm'

class SubmitArticle extends React.Component {
  static async getInitialProps (context, apolloClient) {
    return {}
  }

  render () {
    return (
      <AppWithoutNavbar url={this.props.url}>
        <SubmitArticleForm request_id={this.props.url && this.props.url.query && this.props.url.query.request_id} />
      </AppWithoutNavbar>
    )
  }
}

export default compose(
  withData,
  withApollo
)(SubmitArticle)
