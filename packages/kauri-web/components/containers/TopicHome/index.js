// @flow
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { getTotalArticlesCount } from '../../../queries/Article'
import withLoading from '../../../lib/with-loading'
import TopicHome from './View.js'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const mapStateToProps = (state, ownProps) => ({})

export default compose(connect(mapStateToProps, mapDispatchToProps), graphql(getTotalArticlesCount), withLoading())(TopicHome)
