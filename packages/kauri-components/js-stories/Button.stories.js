// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import IconNoBorderButton from '../components/Button/IconNoBorderButton'
import PrimaryButton from '../components/Button/PrimaryButton'
import SecondaryButton from '../components/Button/SecondaryButton'

const UploadIcon = () => <img src='https://png.icons8.com/color/50/000000/upload.png' />

storiesOf('Button', module)
  .add('IconNoBorderButton', () => (
    <IconNoBorderButton handleClick={() => alert('clicked')} icon={<UploadIcon />}>Background Image</IconNoBorderButton>
  ))
  .add('PrimaryButton', () => (
    <PrimaryButton handleClick={() => alert('clicked')}>Create</PrimaryButton>
  ))
  .add('SecondaryButton', () => (
    <SecondaryButton handleClick={() => alert('clicked')}>Create</SecondaryButton>
  ))
