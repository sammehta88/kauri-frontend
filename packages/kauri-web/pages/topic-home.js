import React from 'react'
import withData from '../lib/with-data'
import App from '../layouts/App'
import TopicHome from '../components/containers/TopicHome'
import { compose } from 'recompose'
import { withRouter } from 'next/router';


class TopicHomePage extends React.Component {
  render() {
    return (
      <App url={this.props.router}>
        <TopicHome category={this.props.router.query.category} />
      </App>
    )
  }
}

export default compose(withData, withRouter)(TopicHomePage)
