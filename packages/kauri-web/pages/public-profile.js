import React from 'react'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import withData from '../lib/with-data'
import App from '../layouts/App'
import { routeChangeAction } from '../lib/Module'
import RinkebyPublicProfile from '../components/connections/PublicProfile/RinkebyPublicProfile.bs'
import { withRouter } from 'next/router';

const ConnectedRinkebyPublicProfile = connect(
  () => ({}),
  { routeChangeAction }
)(RinkebyPublicProfile)

class PublicProfile extends React.Component {
  render() {
    return (
      <App url={this.props.router}>
        <ConnectedRinkebyPublicProfile
          userId={this.props.url && this.props.url.query && this.props.url.query['user_id']}
          routeChangeAction={this.props.routeChangAction}
        />
      </App>
    )
  }
}


export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  withRouter,
)(PublicProfile)
