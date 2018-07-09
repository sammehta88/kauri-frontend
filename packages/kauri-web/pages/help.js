import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import Help from '../components/containers/Help'

class HelpPage extends React.Component {
  render () {
    return (
      <App url={this.props.url}>
        <Help category={'kauri'} />
      </App>
    )
  }
}

export default compose(withData, withApollo)(HelpPage)
