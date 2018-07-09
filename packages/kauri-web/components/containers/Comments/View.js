// @flow
import React, { Component } from 'react'
import { EditorState, convertFromRaw, RichUtils, SelectionState, CompositeDecorator } from 'draft-js'
import { Layout, Card } from 'antd'
import styled from 'styled-components'
import moment from 'moment'

const { Sider } = Layout

const CommentsSider = styled(Sider)`
  display: flex;
  align-items: flex-end;
  height: calc(100vh - 66px);
  padding: 5px;
  overflow: auto;
  background-color: rgb(249, 249, 249);
  > * {
    margin-bottom: 10px;
  }
  > :last-child {
    margin-bottom: 0px;
  }
`

type CommentsProps = {
  comments: ?Array<{
    comment: string,
    date_created: string,
    highlight_from: number,
    highlight_to: number,
    version: number
  }>,
  articleVersions: ?Array<any>
}

const Comment = styled(Card)``

/**
 * Get current selected text
 * @param  {Draft.ContentState}
 * @param  {Draft.SelectionState}
 * @param  {String}
 * @return {String}
 */
function _getTextSelection (contentState, selection, blockDelimiter) {
  blockDelimiter = blockDelimiter || '\n'
  var startKey = selection.getStartKey()
  var endKey = selection.getEndKey()
  var blocks = contentState.getBlockMap()

  var lastWasEnd = false
  var selectedBlock = blocks
    .skipUntil(function (block) {
      return block.getKey() === startKey
    })
    .takeUntil(function (block) {
      var result = lastWasEnd

      if (block.getKey() === endKey) {
        lastWasEnd = true
      }

      return result
    })

  return selectedBlock
    .map(function (block) {
      var key = block.getKey()
      var text = block.getText()

      var start = 0
      var end = text.length

      if (key === startKey) {
        start = selection.getStartOffset()
      }
      if (key === endKey) {
        end = selection.getEndOffset()
      }

      text = text.slice(start, end)
      return text
    })
    .join(blockDelimiter)
}

const extractArticleHighlight = (commentToExtract: any, article: string): string => {
  const { highlight_from, highlight_to, anchor_key, focus_key } = commentToExtract
  let editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(article)))
  let selection = new SelectionState({
    anchorKey: anchor_key,
    anchorOffset: highlight_from,
    focusKey: focus_key,
    focusOffset: highlight_to
  })
  selection = EditorState.acceptSelection(editorState, selection).getSelection()
  const currentContent = editorState.getCurrentContent()
  return _getTextSelection(currentContent, selection)
}

class Comments extends Component<CommentsProps> {
  render () {
    return (
      <CommentsSider>
        {this.props.comments &&
          this.props.comments.length > 0 &&
          this.props.comments.map(comment => (
            <Comment
              id={extractArticleHighlight(comment, this.props.articleVersions[comment.version].text).replace(/ /g, '-')}
              key={comment.date_created}
              title={
                <div>
                  <span style={{ backgroundColor: 'yellow' }}>
                    {extractArticleHighlight(comment, this.props.articleVersions[comment.version].text)}
                  </span>
                  | {moment(comment.date_created).fromNow()}
                </div>
              }
            >
              {comment.comment}
            </Comment>
          ))}
      </CommentsSider>
    )
  }
}

export default (props: any) => (
  <CommentsSider>
    <Comments
      articleVersions={props.data.getArticle && props.data.getArticle.versions}
      comments={
        props.data.getArticle &&
        props.data.getArticle.versions.reduce(
          (current, { comments }, version) => current.concat(comments.map(comment => ({ ...comment, version }))),
          []
        )
      }
    />
  </CommentsSider>
)
