import RecentCategoryArticle from '../../TopicHome/CategoryTab/NewArticle'
import { compose, graphql } from 'react-apollo'
import { globalSearchApprovedCategoryArticles } from '../../../../queries/Article'
import { routeChangeAction } from '../../../../lib/Module'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default compose(
  connect(mapStateToProps, { routeChangeAction }),
  graphql(globalSearchApprovedCategoryArticles, {
    options: ({ category }) => ({
      variables: {
        category,
        size: 1,
      },
    }),
  })
)(RecentCategoryArticle)
