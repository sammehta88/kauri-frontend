// @flow
import React, { Fragment } from 'react'
import styled from 'styled-components'
import { EditorState, convertFromRaw } from 'draft-js'
import { Divider } from 'antd'
import {
  CreateRequestContent as SubmitArticleFormContent,
  CreateRequestContainer as SubmitArticleFormContainer,
  CreateRequestDetails,
} from '../../CreateRequestForm/CreateRequestContent'
import DatePosted from '../../../common/DatePosted'
import { SubmitArticleFormHeadings, OutlineLabel } from '../../SubmitArticleForm/SubmitArticleFormContent'
import DescriptionRow from '../../Requests/DescriptionRow'
import { contentStateFromHTML, getHTMLFromMarkdown } from '../../../../lib/markdown-converter-helper'
import { PositiveActionBadge } from '../../../common/ActionButton'
import ShareArticle from '../../../../../kauri-components/components/Tooltip/ShareArticle.bs'
import Outline from '../../../../../kauri-components/components/Typography/Outline.bs'
import ArticleAction from '../../../../../kauri-components/components/Articles/ArticleAction.bs'

export const ApprovedArticleDetails = CreateRequestDetails.extend`
  align-items: inherit;
`

const Username = styled.strong`
  color: ${props => props.theme.primaryColor};
`

export default ({
  text,
  username,
  userId,
  routeChangeAction,
  article_id,
  article_version,
  subject,
}: {
  text?: string,
  username?: ?string,
  userId?: ?string,
  routeChangeAction: string => void,
  article_id: string,
  subject?: string,
  article_version: number,
}) => {
  let editorState = typeof text === 'string' && JSON.parse(text)
  editorState =
    editorState && typeof editorState.markdown === 'string'
      ? editorState
      : EditorState.createWithContent(convertFromRaw(JSON.parse(text)))

  const headingsAvailable =
    typeof editorState === 'object' && editorState.markdown
      ? contentStateFromHTML(getHTMLFromMarkdown(editorState.markdown))
        .getBlocksAsArray()
        .find(contentBlock => contentBlock.toJS().type.includes('header'))
      : editorState
        .getCurrentContent()
        .getBlocksAsArray()
        .map(block => block.toJS())
        .filter(block => block.type === 'header-two').length > 0

  const outlineHeadings =
    typeof editorState === 'object' &&
    (editorState.markdown
      ? contentStateFromHTML(getHTMLFromMarkdown(editorState.markdown))
        .getBlocksAsArray()
        .map(block => block.toJS())
        .filter(block => block.type.includes('header'))
        .map(header => header.text)
      : editorState.blocks && editorState.blocks.filter(block => block.type.includes('header'))
    ).map(header => header.text)

  return (
    <SubmitArticleFormContent>
      <SubmitArticleFormContainer type='approved article'>
        <DescriptionRow fullText record={{ text }} />
      </SubmitArticleFormContainer>
      <ApprovedArticleDetails type='outline'>
        {headingsAvailable && <Outline headings={outlineHeadings} username={username || userId} />}
        <ArticleAction
          svgIcon={<span>Hey</span>}
          text={'Update Article'}
          handleClick={() =>
            routeChangeAction(`/article/${article_id}/article-version/${article_version}/update-article`)
          }
        >
          Update article
        </ArticleAction>
        <ShareArticle
          url={`https://${
            process.env.monolithExternalApi.includes('rinkeby') ? 'rinkeby.kauri.io/' : 'dev.kauri.io/'
          }/article/${article_id}/article-version/${article_version}`}
          title={subject}
        />
      </ApprovedArticleDetails>
    </SubmitArticleFormContent>
  )
}
