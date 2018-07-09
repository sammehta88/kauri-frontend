import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { addCommentAction } from '../AddCommentForm/Module'
import { getArticle } from '../../../queries/Article'
import { toggleModalAction } from '../../../lib/Module'
import Comments from './View'

const mapStateToProps = (state, ownProps) => ({})

export default compose(
  connect(mapStateToProps, { addCommentAction, toggleModalAction }),
  graphql(getArticle, {
    options: ({ article_id }) => ({
      variables: {
        article_id
      }
    })
  })
)(Comments)
