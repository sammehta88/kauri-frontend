import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import Article from '../components/containers/Article'
import { withRouter } from 'next/router'

class ViewArticle extends React.Component {
  render () {
    return (
      <App url={this.props.router}>
        <Article
          article_id={this.props.router.query['article_id']}
          article_version={this.props.router.query['article_version']}
        />
      </App>
    )
  }
}

export default compose(
  withData,
  withApollo,
  withRouter
)(ViewArticle)
