import SubmittedArticles from './View.js'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { searchPersonalSubmittedArticles } from '../../../queries/Article'
import withLoading from '../../../lib/with-loading'
import { routeChangeAction } from '../../../lib/Module'

const mapStateToProps = (state, ownProps) => {
  return {
    userId: state.app.userId,
    ethUsdPrice: state.app.ethUsdPrice,
  }
}

export default compose(
  connect(mapStateToProps, { routeChangeAction }),
  graphql(searchPersonalSubmittedArticles, {
    options: ({ userId }) => ({
      variables: {
        userId,
      },
    }),
  }),
  withLoading()
)(SubmittedArticles)
