import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import ArticleApproved from '../components/containers/ArticleApproved'

class ArticleApprovedPage extends React.Component {
  render () {
    return (
      <App confirmationPage url={this.props.url}>
        <ArticleApproved isPublished article_id={this.props.url.query.article_id} />
      </App>
    )
  }
}

export default compose(withData, withApollo)(ArticleApprovedPage)
