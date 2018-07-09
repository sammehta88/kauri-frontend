import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { createRequestAction, updateRequestAction } from './Module'
import { routeChangeAction, showNotificationAction } from '../../../lib/Module'
import { getRequest } from '../../../queries/Request'
import withLoading from '../../../lib/with-loading'
import View from './View'

const mapStateToProps = (state, ownProps) => ({ ethUsdPrice: state.app.ethUsdPrice })

export default compose(
  connect(mapStateToProps, { createRequestAction, routeChangeAction, updateRequestAction, showNotificationAction }),
  graphql(getRequest, {
    options: ({ request_id }) => ({
      variables: {
        request_id,
      },
    }),
    skip: ({ request_id }) => !request_id,
  }),
  withLoading()
)(View)
