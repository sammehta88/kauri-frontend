// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import ActionsHeader from '../components/Headers/ActionsHeader'
import { PrimaryButton, TertiaryButton } from '../components/Button'
import Stack from 'stack-styled'

const UploadIcon = () => <img src='https://png.icons8.com/color/50/000000/upload.png' />

storiesOf('Header', module)
  .add('ActionsHeader', () => (
    <ActionsHeader>
      <Stack>
        <TertiaryButton icon={<img src='https://png.icons8.com/flat_round/50/000000/back.png' />}>Cancel Collection</TertiaryButton>
      </Stack>
      <Stack justifyContent={['', 'center']}>
        <TertiaryButton icon={<UploadIcon />}handleClick={() => alert('clicked')}>Background Image</TertiaryButton>
      </Stack>
      <Stack justifyContent={['', 'end']}>
        <PrimaryButton>Create</PrimaryButton>
      </Stack>
    </ActionsHeader>
  ))
