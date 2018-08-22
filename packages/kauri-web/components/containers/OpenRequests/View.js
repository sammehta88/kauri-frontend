// @flow
import React, { Component } from 'react'
import { Divider } from 'antd'
import styled from 'styled-components'
import OpenRequestsFilter from './OpenRequestsFilter'
import OpenRequest from './OpenRequest'
import RequestSearchBar from '../RequestSearchBar'

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

const Header = styled.div`
  background: #1e2428;
  height: 255px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-direction: column;
  font-size: 13px;
`;

const Heading = styled.div`
  font-size: 32px;
  font-weight: 300;
`;

class OpenRequests extends Component<Props> {
  render() {
    const { routeChangeAction } = this.props
    const data = this.props.searchOpenRequests || this.props.data
    const count = data && data.searchRequests && data.searchRequests.content.length

    return (
      <section>
        {typeof this.props.profile !== 'boolean' && (
          <div>
            <Header>
              <Heading>{count || 0} Request{(count > 1 || !count) && 's'}</Heading>
              <p>Articles, Tutorials, Walkthroughs and Documentation</p>
              <RequestSearchBar />
            </Header>
            <OpenRequestsFilter
              categoryQuery={this.props.categoryQuery}
              profile={this.props.profile}
              refetch={data.refetch}
              count={count}
            />
          </div>
        )}
        <OpenRequestsSection>
          {typeof this.props.profile === 'boolean' &&
            this.props.profile === true && <OpenRequestsHeader key='Live Requests'>Live Requests</OpenRequestsHeader>}
          {data && data.searchRequests && data.searchRequests.content.length ? (
            data.searchRequests.content.map(
              (request, index, requests) =>
                <OpenRequest
                  key={request.request_id}
                  routeChangeAction={routeChangeAction}
                  request={request}
                  ethUsdPrice={this.props.ethUsdPrice}
                />
            )
          ) : (
              <p>No requests found.</p>
            )}
          {typeof this.props.profile === 'boolean' &&
            this.props.profile === true && <OpenRequestsHeader completed key='Completed'>
              Completed
              </OpenRequestsHeader>}
          {typeof this.props.searchCompletedRequests === 'object' &&
            typeof this.props.searchCompletedRequests.searchRequests === 'object' &&
            this.props.searchCompletedRequests.searchRequests.content.length >= 1 &&
            this.props.searchCompletedRequests.searchRequests.content.map(
              (request, index, requests) =>
                <OpenRequest
                  key={request.request_id}
                  routeChangeAction={routeChangeAction}
                  request={request}
                  ethUsdPrice={this.props.ethUsdPrice}
                />
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
