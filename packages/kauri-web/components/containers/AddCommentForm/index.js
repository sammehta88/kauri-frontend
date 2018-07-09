import { compose, withApollo } from 'react-apollo'
import { connect } from 'react-redux'
import { addCommentAction } from './Module'
import View from './View'

const mapStateToProps = (state, ownProps) => ({})

export default compose(withApollo, connect(mapStateToProps, { addCommentAction }))(View)
