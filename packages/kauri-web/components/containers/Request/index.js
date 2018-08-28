import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { getRequest } from '../../../queries/Request'
import { routeChangeAction, toggleModalAction } from '../../../lib/Module'
import withLoading from '../../../lib/with-loading'
import {
  flagRequestAction,
  addRequestCommentAction,
  addToBountyAction,
  requestRefundAction,
  resubmitRequestAction,
} from '../Requests/Module'
import { submitArticleAction } from '../SubmitArticleForm/Module'
import Request from './View.js'

const mapStateToProps = (state, ownProps) => {
  return {
    ethUsdPrice: state.app.ethUsdPrice,
    userId: state.app.userId,
    disabledFlagRequest: state.request.disabledFlagRequest,
  }
}

export default compose(
  connect(
    mapStateToProps,
    {
      routeChangeAction,
      flagRequestAction,
      toggleModalAction,
      addRequestCommentAction,
      addToBountyAction,
      submitArticleAction,
      requestRefundAction,
      resubmitRequestAction,
    }
  ),
  graphql(getRequest, {
    options: ({ request_id }) => ({
      variables: {
        request_id,
      },
    }),
  }),
  withLoading()
)(Request)
