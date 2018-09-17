// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import IconNoBorderButton from '../components/Button/IconNoBorderButton'

storiesOf('Button', module)
  .add('IconNoBorderButton', () => (
    <IconNoBorderButton>Background Image</IconNoBorderButton>
  ))
