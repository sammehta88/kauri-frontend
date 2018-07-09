import RecentRequests from './View.js'
import { compose, graphql } from 'react-apollo'
import { searchOpenRequests } from '../../../queries/Request'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const mapStateToProps = (state, ownProps) => {
  return { ethUsdPrice: state.app.ethUsdPrice }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(searchOpenRequests, {
    options: ({ category, size = 4 }) => ({
      variables: {
        category,
        size,
      },
    }),
  })
)(RecentRequests)
