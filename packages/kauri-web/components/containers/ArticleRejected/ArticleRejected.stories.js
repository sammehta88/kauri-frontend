// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import ArticleRejected from './View'

const articleMock: ArticleDTO = {
  category: 'metamask',
  subject: 'How to use metamask with Etherdelta',
}

storiesOf('ArticleRejected', module).add('Example', () => <ArticleRejected data={{ getArticle: articleMock }} />)
