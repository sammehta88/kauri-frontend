// @flow
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { searchApprovedArticles } from '../../../queries/Article'
import withLoading from '../../../lib/with-loading'
import { routeChangeAction } from '../../../lib/Module'
import Help from './View.js'

const mapStateToProps = (state, ownProps) => ({})

export default compose(
  connect(mapStateToProps, { routeChangeAction }),
  graphql(searchApprovedArticles, {
    options: ({ category }) => ({
      variables: {
        category: 'kauri',
        size: 4,
      },
    }),
  }),
  withLoading()
)(Help)
