// @flow
import React from 'react'
import styled from 'styled-components'
import GreenArrow from '../../common/GreenArrow'
import { ActionBadge } from '../../common/ActionBadge'
import { PositiveRequestActionBadge } from '../../common/ActionButton'

const SubmitArticleFormActions = styled.section`
  display: flex;
  flex-direction: row;
  height: 76px;
  width: 100%;
  background-color: ${props => props.theme.secondaryColor};
  padding: 36px ${props => props.theme.padding};
`

const PullRight = styled.div`
  display: flex;
  align-self: center;
  margin-left: auto;
`

type Props = {
  routeChangeAction: string => void,
  handleSubmit: any => void,
  text?: string,
}

export default ({ routeChangeAction, handleSubmit, text }: Props) => (
  <SubmitArticleFormActions>
    <ActionBadge onClick={() => routeChangeAction('back')}>
      <GreenArrow direction={'left'} />
      <span>Cancel Article</span>
    </ActionBadge>
    <PullRight>
      <PositiveRequestActionBadge type='secondary' action={() => alert('draftin')}>
        <span>Draft article</span>
      </PositiveRequestActionBadge>
      <PositiveRequestActionBadge type='primary' action={handleSubmit}>
        <span>{text ? 'Update Article' : 'Submit for Review'}</span>
      </PositiveRequestActionBadge>
    </PullRight>
  </SubmitArticleFormActions>
)
