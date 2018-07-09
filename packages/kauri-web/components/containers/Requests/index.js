import View from '../OpenRequests/View'
import { compose, graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { searchRequests } from '../../../queries/Request'
import { flagRequestAction } from './Module'
import { toggleModalAction, routeChangeAction } from '../../../lib/Module'

const mapStateToProps = (state, ownProps) => ({ userId: state.app.userId, ethUsdPrice: state.app.ethUsdPrice })

export default compose(
  connect(mapStateToProps, {
    flagRequestAction,
    toggleModalAction,
    routeChangeAction,
  }),
  graphql(searchRequests, {
    options: ({ sort, search, status, userId, myRequests }) => ({
      variables: {
        userId: myRequests ? userId : null,
        filter: {
          status_in: ['OPENED'],
        },
      },
    }),
  })
)(View)
