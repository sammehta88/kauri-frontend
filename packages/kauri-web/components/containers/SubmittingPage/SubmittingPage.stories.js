// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import SubmittingPage from './index'

storiesOf('SubmittingPage', module)
  .add('offchain', () => <SubmittingPage type='offchain' />)
  .add('onchain', () => <SubmittingPage type='onchain' />)
