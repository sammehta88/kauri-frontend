import CategoryTab from './View.js'
import { compose, graphql } from 'react-apollo'
import { searchApprovedArticles } from '../../../../queries/Article'
import { routeChangeAction } from '../../../../lib/Module'
import withLoading from '../../../../lib/with-loading'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default compose(
  connect(mapStateToProps, { routeChangeAction }),
  graphql(searchApprovedArticles, {
    options: ({ category }) => ({
      variables: {
        category,
        size: 4,
      },
    }),
  }),
  withLoading()
)(CategoryTab)
