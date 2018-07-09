import View from './View.js'
import { connect } from 'react-redux'
import { routeChangeAction } from '../../../lib/Module'

const mapStateToProps = (state, ownProps) => ({
  userId: state.app.userId,
  user: state.app.user,
})

export default connect(mapStateToProps, { routeChangeAction })(View)
