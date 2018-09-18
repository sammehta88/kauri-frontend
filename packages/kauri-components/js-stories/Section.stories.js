// @flow
import React from 'react'
import { storiesOf } from '@storybook/react'
import PrimaryHeaderSection from '../components/Section/PrimaryHeaderSection'
import ActionsSection from '../components/Section/ActionsSection'
import { AddTagButton, PrimaryButton, TertiaryButton } from '../components/Button'
import Stack from 'stack-styled'
import styled from 'styled-components'
import { space } from 'styled-system'
import ProfileHeaderLabel from '../components/PublicProfile/ProfileHeaderLabel.bs'
import Input from '../components/Input/Input'

const UploadIcon = () => <img src='https://png.icons8.com/color/50/000000/upload.png' />

const CreateColllectionDetails = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    ${space};
  }
`;

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
  .add('PrimaryHeaderSection', () => (
    <PrimaryHeaderSection>
      <CreateColllectionDetails mb={2}>
        <ProfileHeaderLabel header='Collection' />
        <Input placeHolder='Add collection title' fontSize={5} />
        <Input placeHolder='Add description' fontSize={3} />
        <AddTagButton color='white' />
      </CreateColllectionDetails >
      <Stack alignItems={['', 'center']} justifyContent={['', 'end']}>
        <TertiaryButton icon={<UploadIcon />}handleClick={() => alert('clicked')}>Background Image</TertiaryButton>
      </Stack>
    </PrimaryHeaderSection>
  ))
