import OpenRequestsFilter from './View.js'
import { withApollo, compose } from 'react-apollo'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const mapStateToProps = (state, ownProps) => {
  return { userId: state.app && state.app.userId }
}

export default compose(connect(mapStateToProps, mapDispatchToProps), withApollo)(OpenRequestsFilter)
