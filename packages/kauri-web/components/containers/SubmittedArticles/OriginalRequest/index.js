import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { getOriginalRequest } from '../../../../queries/Request'
import withLoading from '../../../../lib/with-loading'
import OriginalRequest from './View'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.app.userId,
    ethUsdPrice: state.app.ethUsdPrice,
    data: { loading: true },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(getOriginalRequest, {
    options: ({ request_id }) => ({
      variables: {
        request_id,
      },
    }),
  }),
  withLoading()
)(OriginalRequest)
