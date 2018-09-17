// @flow
import React from 'react'
import styled from 'styled-components'
import { fontSize, fontWeight, color } from 'styled-system'

const IconNoBorderButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-transform: uppercase;
  color: #fff;
  ${fontSize};
  ${fontWeight};
  ${color};
`

type Props = {
  icon: React.Node,
  children: React.ChildrenArray<T>,
}

export default ({ icon, children, fontWeight = 700, fontSize = 0, color = 'white' }: Props) =>
  <IconNoBorderButton color={color} fontSize={fontSize} fontWeight={fontWeight}>
    {icon}
    {children}
  </IconNoBorderButton>
