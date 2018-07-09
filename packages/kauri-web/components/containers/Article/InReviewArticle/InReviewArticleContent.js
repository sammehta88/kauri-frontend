// @flow
import React from 'react'
import { Divider } from 'antd'
import {
  CreateRequestContent as InReviewArticleFormContent,
  CreateRequestContainer as InReviewArticleFormContainer,
} from '../../CreateRequestForm/CreateRequestContent'
import { ApprovedArticleDetails as InReviewArticleDetails } from '../ApprovedArticle/ApprovedArticleContent'
import InReviewArticleGeneralCommentForm from './InReviewArticleGeneralCommentForm'
import InReviewArticleGeneralComments from './InReviewArticleGeneralComments'
import {
  SubmitArticleFormHeadings as InReviewArticleHeadings,
  OutlineLabel,
} from '../../SubmitArticleForm/SubmitArticleFormContent'
import DescriptionRow from '../../../common/DescriptionRow'

type Comments = Array<?CommentDTO>

export default ({
  editorState,
  onEditorChange,
  comments,
  category,
  toggleModalAction,
  loaded,
  article_id,
  addCommentAction,
  personalUsername,
  deleteArticleComment,
  text,
}: {
  editorState: any,
  onEditorChange: any => void,
  category: string,
  comments: Comments,
  toggleModalAction: any,
  loaded: () => void,
  article_id: string,
  addCommentAction: any,
  personalUsername: ?string,
  deleteArticleComment: any,
  text: string,
}) => (
  <InReviewArticleFormContent>
    <InReviewArticleFormContainer type='in review article'>
      <DescriptionRow fullText record={{ text }} />
      {comments &&
        comments.length > 0 &&
        comments.filter(comment => typeof comment.anchor_key !== 'string') && (
          <InReviewArticleGeneralComments
            comments={
              comments && comments.length > 0 && comments.filter(comment => typeof comment.anchor_key !== 'string')
            }
          />
        )}
      <InReviewArticleGeneralCommentForm addCommentAction={addCommentAction} article_id={article_id} />
    </InReviewArticleFormContainer>
    <InReviewArticleDetails type='outline'>
      <OutlineLabel>Outline</OutlineLabel>
      <Divider style={{ margin: '20px 0' }} />
      <InReviewArticleHeadings
        editorState={editorState && typeof editorState === 'string' ? JSON.parse(editorState) : editorState}
      />
    </InReviewArticleDetails>
  </InReviewArticleFormContent>
)
