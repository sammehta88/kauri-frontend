// @flow
import React, { Fragment } from 'react'
import styled from 'styled-components'
import ArticleRequest from './ArticleRequest'
import { OpenRequestsHeader as ArticleRequestsHeader } from '../../OpenRequests/View'
import { Divider } from 'antd'

export const Container = styled.section`
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`

const NoRequestsWithSubmissions = () => <p>No articles to review found, inbox zero! Hurray!</p>

const ArticleRequests = ({ requests }: { requests: Array<RequestDTO> }) =>
  requests.map(request => <ArticleRequest key={request.request_id} request={request} />)

type Props = {
  ethUsdPrice: number,
  data: { searchRequests: { content: Array<?RequestDTO> }, searchArticles: { content: Array<?ArticleDTO> } },
  userId: string,
  routeChangeAction: string => void,
}

export default ({ ethUsdPrice, userId, data: { searchRequests, searchArticles }, routeChangeAction }: Props) => (
  <Container type='article requests'>
    {searchRequests && searchRequests.content.length > 0 ? (
      <Fragment>
        {searchRequests &&
          searchRequests.content.filter(request => request.status === 'IN_PUBLICATION_PERIOD').length > 0 && (
            <Fragment>
              <ArticleRequests
                requests={
                  searchRequests && searchRequests.content.filter(request => request.status === 'IN_PUBLICATION_PERIOD')
                }
              />
            </Fragment>
          )}
        {searchRequests &&
          searchRequests.content.filter(request => request.status !== 'IN_PUBLICATION_PERIOD').length > 0 && (
            <Fragment>
              <ArticleRequests
                requests={
                  searchRequests && searchRequests.content.filter(request => request.status !== 'IN_PUBLICATION_PERIOD')
                }
              />
            </Fragment>
          )}
      </Fragment>
    ) : (
      <NoRequestsWithSubmissions />
    )}
  </Container>
)
