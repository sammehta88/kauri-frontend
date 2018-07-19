// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
// import faker from 'faker'
import { Divider } from 'antd'
import SubmittedArticle from './SubmittedArticle'
import { OpenRequestsHeader as SubmittedArticlesHeader } from '../OpenRequests/View'

type Props = {
  userId?: string,
  data: { searchArticles?: ?{ content?: Array<ArticleDTO> } },
  routeChangeAction: string => void,
  ethUsdPrice?: number,
}

const Container = styled.section`
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`

class SubmittedArticles extends Component<Props> {
  static Container = Container

  render () {
    if (this.props.data.loading) return <p>Loading...</p>

    const { ethUsdPrice, userId, routeChangeAction } = this.props

    const pendingReviewArticles =
      this.props.data.searchArticles &&
      Array.isArray(this.props.data.searchArticles.content) &&
      this.props.data.searchArticles.content.length > 0 &&
      this.props.data.searchArticles.content.filter(({ status }) => status === 'IN_REVIEW')
    const publishedArticles =
      this.props.data.searchArticles &&
      Array.isArray(this.props.data.searchArticles.content) &&
      this.props.data.searchArticles.content.length > 0 &&
      this.props.data.searchArticles.content.filter(({ status }) => status === 'PUBLISHED')

    return (
      <SubmittedArticles.Container>
        <SubmittedArticlesHeader>Pending Review</SubmittedArticlesHeader>
        <Divider />
        {Array.isArray(pendingReviewArticles) && pendingReviewArticles.length > 0 ? (
          pendingReviewArticles.map(article => (
            <SubmittedArticle
              type='personal'
              routeChangeAction={routeChangeAction}
              key={article.article_id}
              userId={userId}
              article={article}
              ethUsdPrice={ethUsdPrice}
            />
          ))
        ) : (
          <p>No submitted articles.</p>
        )}
        <SubmittedArticlesHeader>Published Articles</SubmittedArticlesHeader>
        <Divider />
        {Array.isArray(publishedArticles) && publishedArticles.length > 0 ? (
          publishedArticles.map(article => (
            <SubmittedArticle
              type='personal'
              key={article.article_id}
              routeChangeAction={routeChangeAction}
              userId={userId}
              article={article}
              ethUsdPrice={ethUsdPrice}
            />
          ))
        ) : (
          <p>No published articles.</p>
        )}
      </SubmittedArticles.Container>
    )
  }
}

export default SubmittedArticles
