import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import PrivacyPolicy from '../components/containers/PrivacyPolicy'

class PrivacyPolicyPage extends React.Component {
  render () {
    return (
      <App url={this.props.url}>
        <PrivacyPolicy category={'kauri'} />
      </App>
    )
  }
}

export default compose(withData, withApollo)(PrivacyPolicyPage)
