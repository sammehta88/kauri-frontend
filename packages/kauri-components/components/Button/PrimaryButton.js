// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { space, fontSize, fontWeight, bg, color } from 'styled-system'

export const BaseButtonCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 136px;
  height: 40px;
  border-radius: 4px;
  cursor: pointer;
  > svg, img {
    height: 16px;
    ${space};
  }
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
  icon?: React.Node,
  children: React.ChildrenArray<T>,
  handleClick: any => void,
}

export default ({ bg = 'primary', fontWeight = 700, fontSize = 0, color = 'white', handleClick, text, children, icon, space = 2 }: Props) =>
  <PrimaryButton mr={space} onClick={handleClick} bg={bg} color={color} fontSize={fontSize} fontWeight={fontWeight}>
    {icon}
    {children || text}
  </PrimaryButton>
