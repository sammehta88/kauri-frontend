// @flow
import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import ArticleCard from '../../../../kauri-components/components/Card/ArticleCard.bs'
import { Link } from '../../../routes'
import { ActionButtons, PositiveRequestActionBadge } from '../../common/ActionButton'
import { ArticleApprovedConfirmationLogoBadge } from '../../common/ActionBadge'
import {
  Container as RequestCreatedContainer,
  ConfirmationSubject as RequestConfirmationSubject,
} from '../RequestCreated/View'
import { Helmet } from 'react-helmet'
import R from 'ramda'

type Props = {
  data?: { getArticle?: ArticleDTO },
  routeChangeAction: string => void,
  type: 'published' | 'approved' | 'drafted' | 'updated',
}

const ConfirmationSubject = RequestConfirmationSubject.extend`
  font-size: 16px;
  margin-bottom: 80px;
`

const Container = RequestCreatedContainer.extend`
  > :first-child {
    margin-bottom: 7px;
  }
`

const ArticleApprovedActionButtons = ActionButtons.extend`
  margin-top: 20px;
  > :first-child {
    margin-right: 0px;
  }
`

class ArticleApproved extends React.Component<Props> {
  render () {
    const { data, routeChangeAction, type } = this.props
    const article = data && typeof data.getArticle === 'object' && data.getArticle
    const subjectCopy = R.cond([
      [R.equals('updated'), R.always('has been updated')],
      [R.equals('drafted'), R.always('draft has been saved')],
      [R.equals('published'), R.always('is now live')],
      [R.equals('approved'), R.always('now needs publishing from author before going live')],
    ])(type)

    const capitalize = R.replace(/^./, R.toUpper)

    return (
      <Container>
        <Helmet>
          <title>{`Kauri - Article ${capitalize(type)}`}</title>
        </Helmet>
        <ArticleApprovedConfirmationLogoBadge
          chosenCategory={data && typeof data.getArticle === 'object' && data.getArticle.category}
          confirmationMessage={type}
        />
        <ConfirmationSubject>{`The article ${subjectCopy}`}</ConfirmationSubject>
        <ArticleCard
          changeRoute={routeChangeAction}
          key={article.article_id}
          date={moment(article.date_created).format('D MMM YYYY')}
          title={article.subject}
          content={article.text}
          userId={article.user.user_id}
          username={article.user.username}
          articleId={article.article_id}
          articleVersion={article.article_version}
          cardHeight={500}
          linkComponent={(childrenProps, route) => (
            <Link toSlug={route.includes('article') && article.subject} useAnchorTag route={route}>
              {childrenProps}
            </Link>
          )}
        />
        <ArticleApprovedActionButtons>
          <PositiveRequestActionBadge
            action={() => routeChangeAction(type === 'approved' ? '/approvals' : '/profile?tab=my articles')}
            height={40}
            width={183}
            label={type === 'approved' ? 'Back to Approvals' : 'My Articles'}
            type='primary'
          />
        </ArticleApprovedActionButtons>
      </Container>
    )
  }
}

export default ArticleApproved
