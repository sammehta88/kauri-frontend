import ExpiredRequests from './View.js'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import moment from 'moment'
import { searchExpiredRequests } from '../../../queries/Request'
import { routeChangeAction } from '../../../lib/Module'
import withLoading from '../../../lib/with-loading'

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.app && state.app.userId,
    ethUsdPrice: state.app && state.app.ethUsdPrice,
  }
}

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction }
  ),
  graphql(searchExpiredRequests, {
    options: ({ userId }) => ({
      variables: {
        userId,
        currentDate: moment()
          .utc()
          .valueOf(),
      },
    }),
  }),
  withLoading()
)(ExpiredRequests)
