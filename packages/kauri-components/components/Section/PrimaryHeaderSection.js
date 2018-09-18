// @flow
import React from 'react'
import styled from 'styled-components'
import Stack from 'stack-styled'
import { bgColor } from 'styled-system'

const PrimaryHeaderSectionStack = styled(Stack)`
  ${bgColor};
`

const PrimaryHeaderSection = ({ bg = 'bgPrimary', children }) =>
  <PrimaryHeaderSectionStack bg={bg} justifyContent={['', 'start']} gridAutoFlow={['', 'column']} gridTemplateColumns='minmax(auto, 1fr) minmax(auto, 1fr)'>
    {children}
  </PrimaryHeaderSectionStack>

export default PrimaryHeaderSection
