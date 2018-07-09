import Homepage from './View.js'
import { compose, graphql } from 'react-apollo'
import { globalSearchApprovedArticles } from '../../../queries/Article'
import { connect } from 'react-redux'
import { routeChangeAction } from '../../../lib/Module'
import withLoading from '../../../lib/with-loading'

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default compose(
  connect(mapStateToProps, { routeChangeAction }),
  graphql(globalSearchApprovedArticles, {
    options: ({ category }) => ({
      variables: {
        size: 4,
      },
    }),
  }),
  withLoading()
)(Homepage)
