import FlaggedRequests from './View.js'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import withLoading from '../../../lib/with-loading'
import { routeChangeAction } from '../../../lib/Module'
import { searchPersonalFlaggedRequests } from '../../../queries/Request'

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.app.userId,
    ethUsdPrice: state.app.ethUsdPrice,
  }
}

export default compose(
  connect(mapStateToProps, { routeChangeAction }),
  graphql(searchPersonalFlaggedRequests, {
    options: ({ userId }) => ({
      variables: {
        filter: {
          user_id_eq: userId,
        },
      },
    }),
  }),
  withLoading()
)(FlaggedRequests)
