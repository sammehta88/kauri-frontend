// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import ActionsSection from '../components/Section/ActionsSection'
import { PrimaryButton, TertiaryButton } from '../components/Button'
import Stack from 'stack-styled'

const UploadIcon = () => <img src='https://png.icons8.com/color/50/000000/upload.png' />

storiesOf('Section', module)
  .add('ActionsSection', () => (
    <ActionsSection>
      <Stack alignItems={['', 'center']} >
        <TertiaryButton icon={<img src='https://png.icons8.com/flat_round/50/000000/back.png' />}>Cancel Collection</TertiaryButton>
      </Stack>
      <Stack alignItems={['', 'center']} justifyContent={['', 'center']}>
        <TertiaryButton icon={<UploadIcon />}handleClick={() => alert('clicked')}>Background Image</TertiaryButton>
      </Stack>
      <Stack alignItems={['', 'center']} justifyContent={['', 'end']}>
        <PrimaryButton>Create</PrimaryButton>
      </Stack>
    </ActionsSection>
  ))
