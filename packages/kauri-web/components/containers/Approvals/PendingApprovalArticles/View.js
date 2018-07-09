// @flow
import React from 'react'
import { Container } from '../ArticleRequests/View'
import SubmittedArticle from '../../SubmittedArticles/SubmittedArticle'
import type { ApproveArticlePayload } from '../../Article/Module'

const NoArticlesSubmitted = () => (
  <Container>
    <p>No articles to approve found, inbox zero! Hurray!</p>
  </Container>
)

const PendingApprovals = ({
  articles,
  ethUsdPrice,
  userId,
  routeChangeAction,
  approveArticleAction,
  rejectArticleAction,
}: {
  articles: Array<ArticleDTO>,
  ethUsdPrice: number,
  userId: string,
  routeChangeAction: string => void,
  approveArticleAction: ApproveArticlePayload => void,
  rejectArticleAction: string => void,
}) => (
  <Container>
    {articles.map(article => (
      <SubmittedArticle
        type='approval'
        routeChangeAction={routeChangeAction}
        approveArticleAction={approveArticleAction}
        rejectArticleAction={rejectArticleAction}
        userId={userId}
        ethUsdPrice={ethUsdPrice}
        key={article.article_id}
        article={article}
      />
    ))}
  </Container>
)

type Props = {
  data: { searchArticles: { content: Array<?ArticleDTO> } },
  ethUsdPrice: ?number,
  userId: ?string,
  routeChangeAction: string => void,
  approveArticleAction: ApproveArticlePayload => void,
  rejectArticleAction: string => void,
}

export default ({
  data: {
    searchArticles: { content },
  },
  ethUsdPrice,
  userId,
  routeChangeAction,
  approveArticleAction,
  rejectArticleAction,
}: Props) =>
  content.length > 0 ? (
    <PendingApprovals
      routeChangeAction={routeChangeAction}
      articles={content}
      ethUsdPrice={ethUsdPrice}
      userId={userId}
      approveArticleAction={approveArticleAction}
      rejectArticleAction={rejectArticleAction}
    />
  ) : (
    <NoArticlesSubmitted />
  )
