// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { fontSize, fontWeight, bg, color } from 'styled-system'

export const BaseButtonCss = css`
  min-width: 136px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  ${fontWeight};
  ${fontSize};
  ${bg};
  ${color};
`

const bgHover = ({ theme: { bg: { primaryDark } } }) => primaryDark

const PrimaryButton = styled.button`
  ${BaseButtonCss};
  :hover {
    background-color: ${bgHover};
  }
`

type Props = {
  icon: React.Node,
  children: React.ChildrenArray<T>,
  handleClick: any => void,
}

export default ({ bg = 'primary', fontWeight = 700, fontSize = 0, color = 'white', handleClick, text, children }: Props) =>
  <PrimaryButton onClick={handleClick} bg={bg} color={color} fontSize={fontSize} fontWeight={fontWeight}>
    {children || text}
  </PrimaryButton>
