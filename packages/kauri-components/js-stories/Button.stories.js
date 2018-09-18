// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import IconNoBorderButton from '../components/Button/IconNoBorderButton'

const UploadIcon = () => <img src='https://png.icons8.com/color/50/000000/upload.png' />

storiesOf('Button', module)
  .add('IconNoBorderButton', () => (
    <IconNoBorderButton icon={<UploadIcon />}>Background Image</IconNoBorderButton>
  ))
