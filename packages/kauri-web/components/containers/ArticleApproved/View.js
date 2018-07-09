// @flow
import React from 'react'
import styled from 'styled-components'
import { ActionButtons, ActionButton } from '../../common/ActionButton'
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
  margin-bottom: 50px;
`

const Container = RequestCreatedContainer.extend`
  > :first-child {
    margin-bottom: 7px;
  }
`

const ArticleApprovedActionButtons = ActionButtons.extend`
  > :first-child {
    margin-right: 0px;
  }
`

class ArticleApproved extends React.Component<Props> {
  render () {
    const { data, routeChangeAction, isPublished, type } = this.props
    return (
      <Container>
        <ArticleApprovedConfirmationLogoBadge
          chosenCategory={data && typeof data.getArticle === 'object' && data.getArticle.category}
          confirmationMessage={`Article ${
            type === 'finalised' ? 'submitted for publishing' : isPublished ? 'Published' : 'Approved'
          }`}
        />
        <ConfirmationSubject>
          {data && typeof data.getArticle === 'object' && data.getArticle.subject}
        </ConfirmationSubject>
        <ArticleApprovedActionButtons>
          <ActionButton
            action={() => routeChangeAction(type === 'finalised' ? '/profile?tab=my articles' : '/approvals')}
            height={40}
            width={183}
            label={type === 'finalised' ? 'My articles' : 'Back to Approvals'}
            type='alt'
          />
        </ArticleApprovedActionButtons>
      </Container>
    )
  }
}

export default ArticleApproved
