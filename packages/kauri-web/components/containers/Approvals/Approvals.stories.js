import React from 'react'
import { storiesOf } from '@storybook/react'
import Approvals from './View'
import { singleMockData, multipleMockData } from './Approvals.mock'

storiesOf('Approvals', module)
  .add('Multiple approval', () => <Approvals data={multipleMockData} />)
  .add('One approval', () => <Approvals data={singleMockData} />)
  .add('Zero approval', () => <Approvals data={{ searchArticles: { content: [] } }} />)
