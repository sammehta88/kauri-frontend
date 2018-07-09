import React from 'react'
import { withApollo, compose } from 'react-apollo'
import withData from '../lib/with-data'
import App from '../layouts/App'
import LoginForm from '../components/containers/LoginForm'

class Login extends React.Component {
  render () {
    return (
      <App url={this.props.url}>
        <LoginForm />
      </App>
    )
  }
}

export default compose(withData, withApollo)(Login)
