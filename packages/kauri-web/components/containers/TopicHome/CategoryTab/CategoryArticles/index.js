import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { searchApprovedArticles } from '../../../../../queries/Article'
import { routeChangeAction } from '../../../../../lib/Module'
import withLoading from '../../../../../lib/with-loading'
import CategoryArticles from './View.js'

const mapStateToProps = (state, ownProps) => {
  return {
    ethUsdPrice: state.app.ethUsdPrice,
  }
}

export default compose(
  connect(mapStateToProps, { routeChangeAction }),
  graphql(searchApprovedArticles, {
    options: ({ category }) => ({
      variables: {
        category,
      },
    }),
  })
)(CategoryArticles)
