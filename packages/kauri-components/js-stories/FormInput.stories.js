//  @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components'
import Input from '../components/Input/Input';

const Box = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 100px;
  background: black;
`

storiesOf('FormInput', module)
  .add('Name', () => (
    <Box>
      <Input placeHolder='Enter your name here' fontSize={3} />
    </Box>
  ))
  .add('Different Font size', () => (
    <Box>
      <Input placeHolder='Enter your name here' fontSize={5} />
    </Box>
  ))
  .add('handle change alert', () => (
    <Box>
      <Input handleChange={value => alert('key press ' + value)} placeHolder='Enter your name here' fontSize={5} />
    </Box>
  ))
