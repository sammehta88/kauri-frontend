import React from 'react'
import { compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import { TopicOwnerProfile } from '../components/containers/Profile'
// import { currentUser } from '../queries/Profile'
import { withRouter } from 'next/router'

class ProfilePage extends React.Component {
  render () {
    const mockTopicOwner = 'topic owner'

    return (
      <App url={this.props.router}>
        {(() => {
          // switch (this.props.data && this.props.data.currentUser && this.props.data.currentuser.role) {
          switch (mockTopicOwner) {
            case 'topic owner':
              return <TopicOwnerProfile userId={this.props.userId} defaultTab={this.props.router.query.tab} />
            default:
              return <p>No role found?</p>
          }
        })()}
      </App>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  withRouter
)(ProfilePage)
