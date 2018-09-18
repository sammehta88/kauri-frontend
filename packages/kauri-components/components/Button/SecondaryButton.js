// @flow
import React from 'react'
import styled from 'styled-components'
import { BaseButtonCss } from './PrimaryButton'

const bgHoverDark = ({ theme: { bg: { secondaryBlueDark } } }) => secondaryBlueDark

const SecondaryButton = styled.button`
  ${BaseButtonCss};
  :hover {
    background-color: ${bgHoverDark};
  }
`

type Props = {
  icon?: React.Node,
  children: React.ChildrenArray<T>,
  handleClick: any => void,
}

export default ({ bg = 'secondaryBlue', fontWeight = 700, fontSize = 0, color = 'white', space = 2, handleClick, text, children, icon }: Props) =>
  <SecondaryButton mr={space} onClick={handleClick} bg={bg} color={color} fontSize={fontSize} fontWeight={fontWeight}>
    {icon}
    {children || text}
  </SecondaryButton>
