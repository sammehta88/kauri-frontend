import TopicOwnerProfile from './View.js'
import { fetchWalletAvailableFundsAction, withdrawWalletAvailableFundsAction } from './Module'
import { connect } from 'react-redux'

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.app && state.app.user,
    userId: state.app && state.app.userId,
    funds: state.app && state.app.user && state.app.user.funds,
    ethUsdPrice: state.app.ethUsdPrice,
  }
}

export default connect(mapStateToProps, { fetchWalletAvailableFundsAction, withdrawWalletAvailableFundsAction })(
  TopicOwnerProfile
)
