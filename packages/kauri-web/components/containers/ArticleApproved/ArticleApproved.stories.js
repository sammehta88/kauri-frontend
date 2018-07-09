// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import ArticleApproved from './View'

const articleMock: ArticleDTO = {
  category: 'metamask',
  subject: 'How to use metamask with Etherdelta',
}

storiesOf('ArticleApproved', module).add('Example', () => <ArticleApproved data={{ getArticle: articleMock }} />)
