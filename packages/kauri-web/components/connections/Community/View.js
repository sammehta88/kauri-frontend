// @flow
import React from 'react'
import Community from './Community.bs'

type Props = {
  category: string,
  hostName: string,
  data?: { getCommunity?: ?CommunityDTO }
}

class CommunityConnection extends React.Component<Props> {
  render () {
    return (
      this.props.data &&
      this.props.data.getCommunity &&
      <Community website={this.props.data.getCommunity.website} category={this.props.category} hostName={this.props.hostName} />
    )
  }
}

export default CommunityConnection
