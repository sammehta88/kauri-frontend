import RecentRequests from '../../RecentRequests/View'
import { compose, graphql } from 'react-apollo'
import { globalSearchOpenRequests } from '../../../../queries/Request'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const mapStateToProps = (state, ownProps) => {
  return { ethUsdPrice: state.app.ethUsdPrice }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(globalSearchOpenRequests, {
    options: () => ({
      variables: {
        size: 4,
        filter: {
          status_in: ['OPENED'],
        },
      },
    }),
  })
)(RecentRequests)
