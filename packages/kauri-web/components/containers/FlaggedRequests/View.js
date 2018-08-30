// @flow
import React, { Component } from 'react'
import Web3 from 'web3'
import styled from 'styled-components'
import FlaggedRequest from '../OpenRequests/OpenRequest'

type Props = {
  data?: { searchRequests?: { content: Array<?RequestDTO> } },
  userId: ?string,
  routeChangeAction: string => void,
  ethUsdPrice: number,
}

const FlaggedRequestsSection = styled.section`
  padding: 0em ${({ theme }) => theme.padding};
`

export const FlaggedRequestsHeader = styled.h2`
  margin-top: ${props => (props.completed ? '2em' : '1em')};
  font-weight: 500;
  font-size: 20px;
`

class FlaggedRequests extends Component<Props> {
  web3: any = null
  constructor(props: Props) {
    super(props)
    this.web3 = new Web3()
  }

  render() {
    const { data, routeChangeAction } = this.props
    const personalFlaggedRequests =
      data && data.searchRequests && data.searchRequests.content.filter(request => request.is_flagged === true)

    return (
      <FlaggedRequestsSection>
        <FlaggedRequestsHeader key='Flagged Requests'>Flagged Requests</FlaggedRequestsHeader>
        {personalFlaggedRequests && personalFlaggedRequests.length > 0 ? (
          personalFlaggedRequests.map(
            (request, index, requests) =>
              <FlaggedRequest
                key={request.request_id}
                routeChangeAction={routeChangeAction}
                web3={this.web3}
                request={request}
                ethUsdPrice={this.props.ethUsdPrice}
              />
          )
        ) : (
            <p>No requests flagged.</p>
          )}
      </FlaggedRequestsSection>
    )
  }
}

export default FlaggedRequests
