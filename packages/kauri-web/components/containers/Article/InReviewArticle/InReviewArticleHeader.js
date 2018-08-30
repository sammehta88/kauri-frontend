// @flow
import React from 'react'
import styled from 'styled-components'
import {
  CreateRequestLogo as InReviewArticleLogo,
  CreateRequestSecondaryHeader as InReviewArticleSecondaryHeader,
} from '../../CreateRequestForm/CreateRequestHeader'
import { ApprovedArticleSubject as InReviewArticleSubject, PullRight } from '../ApprovedArticle/ApprovedArticleHeader'
import { DatePosted } from '../../../common/DatePosted'
import theme from '../../../../lib/theme-config'

export const InReviewArticleStatus = DatePosted.extend`
  margin-top: 0;
  align-self: center;
  color: #fff;
`

const InReviewHeaderDetails = styled.div`
  display: flex;
  flex-direction: column;
  > :last-child {
    margin-left: 23px;
    margin-left: ${props => !props.chosenCategory && '0px'};
  }
  min-width: 70%;
`

export default ({ category, sub_category, status, subject, metadata }: *) => (
  <InReviewArticleSecondaryHeader type='article' theme={theme} chosenCategory={category}>
    {category && <InReviewArticleLogo type='article' theme={theme} chosenCategory={category} />}
    <InReviewHeaderDetails chosenCategory={category}>
      <InReviewArticleSubject
        type='in review article'
        metadata={metadata}
        subject={subject}
        theme={theme}
        chosenCategory={category}
        chosenSubcategory={sub_category}
      />
    </InReviewHeaderDetails>
    <PullRight>
      <InReviewArticleStatus>
        <span>STATUS</span>
        <strong> {typeof status === 'string' && status.replace(/_/g, ' ')}</strong>
      </InReviewArticleStatus>
    </PullRight>
  </InReviewArticleSecondaryHeader>
)
