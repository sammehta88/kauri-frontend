// @flow
import React, { Component } from 'react'
import { Divider } from 'antd'
import styled from 'styled-components'
import OpenRequestsFilter from './OpenRequestsFilter'
import OpenRequest from './OpenRequest'

type Props = {
  userId: ?string,
  data?: { searchRequests?: ?{ content: Array<RequestDTO> }, refetch: any },
  ethUsdPrice: number,
  profile?: boolean,
  searchCompletedRequests?: { searchRequests?: ?{ content: Array<RequestDTO> } },
  searchOpenRequests?: { searchRequests?: ?{ content: Array<RequestDTO> } },
  categoryQuery?: string,
  routeChangeAction: string => void,
}

const OpenRequestsSection = styled.section`
  padding: 0em ${({ theme }) => theme.padding};
  padding-bottom: 2em;
`

export const OpenRequestsHeader = styled.h2`
  margin-top: ${props => (props.completed ? '2em' : '1em')};
  font-weight: 500;
  font-size: 20px;
`

class OpenRequests extends Component<Props> {
  render () {
    const { routeChangeAction } = this.props
    const data = this.props.searchOpenRequests || this.props.data
    const count = data && data.searchRequests && data.searchRequests.content.length

    return (
      <section>
        {typeof this.props.profile !== 'boolean' && (
          <OpenRequestsFilter
            categoryQuery={this.props.categoryQuery}
            profile={this.props.profile}
            refetch={data.refetch}
            count={count}
          />
        )}
        <OpenRequestsSection>
          {typeof this.props.profile === 'boolean' &&
            this.props.profile === true && [
              <OpenRequestsHeader key='Live Requests'>Live Requests</OpenRequestsHeader>,
              <Divider key='Live Requests Divider' />,
            ]}
          {data && data.searchRequests && data.searchRequests.content.length ? (
            data.searchRequests.content.map(
              (request, index, requests) =>
                index !== requests.length - 1 ? (
                  <div key={request.request_id}>
                    <OpenRequest
                      routeChangeAction={routeChangeAction}
                      request={request}
                      ethUsdPrice={this.props.ethUsdPrice}
                    />
                    <Divider />
                  </div>
                ) : (
                  <OpenRequest
                    key={request.request_id}
                    routeChangeAction={routeChangeAction}
                    request={request}
                    ethUsdPrice={this.props.ethUsdPrice}
                  />
                )
            )
          ) : (
            <p>No requests found.</p>
          )}
          {typeof this.props.profile === 'boolean' &&
            this.props.profile === true && [
              <OpenRequestsHeader completed key='Completed'>
                Completed
              </OpenRequestsHeader>,
              <Divider key='Completed Divider' />,
            ]}
          {typeof this.props.searchCompletedRequests === 'object' &&
            typeof this.props.searchCompletedRequests.searchRequests === 'object' &&
            this.props.searchCompletedRequests.searchRequests.content.length >= 1 &&
            this.props.searchCompletedRequests.searchRequests.content.map(
              (request, index, requests) =>
                index !== requests.length - 1 ? (
                  <div key={request.request_id}>
                    <OpenRequest
                      key={request.request_id}
                      routeChangeAction={routeChangeAction}
                      request={request}
                      ethUsdPrice={this.props.ethUsdPrice}
                    />
                    <Divider key={request.request_id} />
                  </div>
                ) : (
                  <OpenRequest
                    key={request.request_id}
                    routeChangeAction={routeChangeAction}
                    request={request}
                    ethUsdPrice={this.props.ethUsdPrice}
                  />
                )
            )}
          {typeof this.props.searchCompletedRequests === 'object' &&
            typeof this.props.searchCompletedRequests.searchRequests === 'object' &&
            this.props.searchCompletedRequests.searchRequests.content.length < 1 && <p>No completed requests.</p>}
        </OpenRequestsSection>
      </section>
    )
  }
}

export default OpenRequests
