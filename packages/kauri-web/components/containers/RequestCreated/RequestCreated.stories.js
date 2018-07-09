// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import RequestCreated from './View'
import moment from 'moment'

const requestMock: RequestDTO = {
  category: 'metamask',
  dead_line: moment().add(7, 'day'),
  subject: 'How to use metamask with Etherdelta',
}

storiesOf('RequestCreated', module).add('Example', () => <RequestCreated data={{ getRequest: requestMock }} />)
