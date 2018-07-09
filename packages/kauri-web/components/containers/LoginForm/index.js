import { compose } from 'recompose'
import { connect } from 'react-redux'
import { registerAction } from './Module.js'
import { showNotificationAction } from '../../../lib/Module'
import View from './View.js'

const mapStateToProps = (state, ownProps) => ({})

export default compose(connect(mapStateToProps, { registerAction, showNotificationAction }))(View)
