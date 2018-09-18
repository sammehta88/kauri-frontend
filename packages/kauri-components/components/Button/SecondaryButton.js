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
  icon: React.Node,
  children: React.ChildrenArray<T>,
  handleClick: any => void,
}

export default ({ bg = 'secondaryBlue', fontWeight = 700, fontSize = 0, color = 'white', handleClick, text, children }: Props) =>
  <SecondaryButton onClick={handleClick} bg={bg} color={color} fontSize={fontSize} fontWeight={fontWeight}>
    {children || text}
  </SecondaryButton>
