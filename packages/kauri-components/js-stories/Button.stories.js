// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import TertiaryButton from '../components/Button/TertiaryButton'
import PrimaryButton from '../components/Button/PrimaryButton'
import SecondaryButton from '../components/Button/SecondaryButton'

const UploadIcon = () => <img src='https://png.icons8.com/color/50/000000/upload.png' />

storiesOf('Button', module)
  .add('PrimaryButton', () => (
    <PrimaryButton handleClick={() => alert('clicked')}>Create</PrimaryButton>
  ))
  .add('PrimaryButton with icon', () => (
    <PrimaryButton icon={<UploadIcon />}handleClick={() => alert('clicked')}>Create</PrimaryButton>
  ))
  .add('PrimaryButton Disabled', () => (
    <PrimaryButton disabled handleClick={() => alert('clicked')}>Create</PrimaryButton>
  ))
  .add('SecondaryButton', () => (
    <SecondaryButton handleClick={() => alert('clicked')}>Create</SecondaryButton>
  ))
  .add('SecondaryButton with icon', () => (
    <SecondaryButton icon={<UploadIcon />}handleClick={() => alert('clicked')}>Create</SecondaryButton>
  ))
  .add('SecondaryButton Disabled', () => (
    <SecondaryButton disabled icon={<UploadIcon />}handleClick={() => alert('clicked')}>Create</SecondaryButton>
  ))
  .add('TertiaryButton', () => (
    <TertiaryButton handleClick={() => alert('clicked')} icon={<UploadIcon />}>Background Image</TertiaryButton>
  ))
