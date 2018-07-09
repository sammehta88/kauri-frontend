import { connect } from 'react-redux'
import Topics from './View.js'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const mapStateToProps = (state, ownProps) => {
  return { categories: state.app.categories }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topics)
