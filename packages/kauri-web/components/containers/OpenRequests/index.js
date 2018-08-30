import OpenRequests from './View.js'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { globalSearchOpenRequests, searchCompletedRequests } from '../../../queries/Request'
import { routeChangeAction } from '../../../lib/Module'

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.app.userId,
    ethUsdPrice: state.app.ethUsdPrice,
  }
}

export default compose(
  connect(
    mapStateToProps,
    { routeChangeAction }
  ),
  graphql(globalSearchOpenRequests, {
    name: 'searchOpenRequests',
    options: ({ userId }) => ({
      variables: {
        filter: {
          user_id_eq: userId,
          status_in: ['CREATED', 'OPENED', 'IN_PUBLICATION_PERIOD'],
        },
      },
    }),
  }),
  graphql(searchCompletedRequests, {
    name: 'searchCompletedRequests',
    options: ({ userId, profile }) => ({
      variables: {
        filter: {
          user_id_eq: userId,
          status_in: ['CLOSED'],
        },
      },
    }),
    skip: ({ profile }) => !profile,
  })
)(OpenRequests)
