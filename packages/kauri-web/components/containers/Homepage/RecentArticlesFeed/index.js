import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { globalSearchApprovedArticles } from '../../../../queries/Article'
import { routeChangeAction } from '../../../../lib/Module'
import RecentArticlesFeed from '../../TopicHome/CategoryTab/CategoryArticles/View'

const mapStateToProps = (state, ownProps) => {
  return {
    ethUsdPrice: state.app.ethUsdPrice,
  }
}

export default compose(connect(mapStateToProps, { routeChangeAction }), graphql(globalSearchApprovedArticles))(
  RecentArticlesFeed
)
