// @flow
import React from 'react'
import styled from 'styled-components'
import Stack from 'stack-styled'
import { bgColor } from 'styled-system'

const ActionsHeaderStack = styled(Stack)`
  ${bgColor}
`

const ActionsHeader = ({ bg = 'bgPrimary', children }) =>
  <ActionsHeaderStack bg={bg} justifyContent={['', 'start']} gridAutoFlow={['', 'column']} gridTemplateColumns='minmax(auto, 1fr) minmax(auto, 1fr) minmax(auto, 1fr)'>
    {children}
  </ActionsHeaderStack>

export default ActionsHeader
