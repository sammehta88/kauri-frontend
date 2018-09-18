// @flow
import React from 'react'
import styled from 'styled-components'
import { fontSize, fontWeight, color, space } from 'styled-system'

const IconNoBorderButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-transform: uppercase;
  color: #fff;
  ${fontSize};
  ${fontWeight};
  ${color};
  > :first-child {
    height: 18px;
    width: 18px;
    ${space};
  }
  :hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

type Props = {
  icon: React.Node,
  children: React.ChildrenArray<T>,
  handleClick: any => void;
}

export default ({ icon, children, fontWeight = 700, fontSize = 0, space = 2, color = 'white', handleClick }: Props) =>
  <IconNoBorderButton onClick={handleClick} mr={space} color={color} fontSize={fontSize} fontWeight={fontWeight}>
    {icon}
    {children}
  </IconNoBorderButton>
