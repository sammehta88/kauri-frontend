import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import { searchApprovedArticles } from '../../../../queries/Article'
import withLoading from '../../../../lib/with-loading'
import { routeChangeAction } from '../../../../lib/Module'
import Topic from './View'

const mapStateToProps = (state, ownProps) => {
  return { categories: state.app.categories }
}

export default compose(
  connect(mapStateToProps, { routeChangeAction }),
  graphql(searchApprovedArticles, {
    options: ({ category }) => ({
      variables: {
        category,
        size: 2,
      },
    }),
  }),
  withLoading()
)(Topic)
