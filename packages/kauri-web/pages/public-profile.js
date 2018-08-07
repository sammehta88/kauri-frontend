import React from 'react'
import { compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import RinkebyPublicProfile from '../components/connections/PublicProfile/RinkebyPublicProfile.bs'

class PublicProfile extends React.Component {
  render () {
    return (
      <App url={this.props.url}>
        <RinkebyPublicProfile userId={this.props.url && this.props.url.query && this.props.url.query['user_id']} />
      </App>
    )
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData
)(PublicProfile)
