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

type Props = {
  data?: { getArticle?: ArticleDTO },
  routeChangeAction: string => void,
  isPublished?: boolean,
  type?: string,
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
    const { data, routeChangeAction, isPublished, type } = this.props
    const article = data && typeof data.getArticle === 'object' && data.getArticle
    return (
      <Container>
        <ArticleApprovedConfirmationLogoBadge
          chosenCategory={data && typeof data.getArticle === 'object' && data.getArticle.category}
          confirmationMessage={
            type === 'updated' ? 'Updated' : type === 'drafted' ? 'Drafted' : isPublished ? 'Published' : 'Approved'
          }
        />
        <ConfirmationSubject>
          The article{' '}
          {type === 'updated'
            ? 'has been updated'
            : type === 'drafted'
              ? 'draft has been saved'
              : isPublished
                ? 'is now live'
                : 'now needs publishing before going live'}
        </ConfirmationSubject>
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
            action={() =>
              routeChangeAction(
                type === 'drafted' || type === 'updated' || isPublished ? '/profile?tab=my articles' : '/approvals'
              )
            }
            height={40}
            width={183}
            label={type === 'drafted' || type === 'updated' || isPublished ? 'My Articles' : 'Back to Approvals'}
            type='primary'
          />
        </ArticleApprovedActionButtons>
      </Container>
    )
  }
}

export default ArticleApproved
