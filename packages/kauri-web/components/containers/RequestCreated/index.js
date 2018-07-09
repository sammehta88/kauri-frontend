import RequestCreated from './View.js'
import { routeChangeAction } from '../../../lib/Module'
import { getRequest } from '../../../queries/Request'
import withLoading from '../../../lib/with-loading'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default compose(
  connect(mapStateToProps, { routeChangeAction }),
  graphql(getRequest, { options: ({ request_id }) => ({ variables: { request_id } }) }),
  withLoading()
)(RequestCreated)
