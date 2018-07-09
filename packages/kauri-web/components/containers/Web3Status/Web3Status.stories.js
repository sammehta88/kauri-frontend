import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import Web3Status from './index'

const FakeNavbar = styled.section`
  display: flex;
  background: ${props => props.theme.secondaryColor};
  height: 96px;
  justify-content: center;
`

storiesOf('Web3Status', module)
  .add('Not open', () => (
    <FakeNavbar>
      <Web3Status />
    </FakeNavbar>
  ))
  .add('Open', () => (
    <FakeNavbar>
      <Web3Status />
    </FakeNavbar>
  ))
