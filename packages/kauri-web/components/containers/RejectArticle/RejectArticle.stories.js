// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import RejectArticle from './View'

const articleMock: ArticleDTO = {
  category: 'metamask',
  subject: 'How to use metamask with Etherdelta',
}

storiesOf('Reject Article', module).add('Example', () => <RejectArticle data={{ getArticle: articleMock }} />)
