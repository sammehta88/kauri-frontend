// @flow
import React, { Fragment } from 'react'
import styled from 'styled-components'
import Email from './Email'
import Logo from './Logo'
import ConsenSys from './ConsenSys'
import { Layout } from 'antd'

const Footer = Layout.Footer

const NewFooter = styled(Footer)`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: ${props => props.theme.primaryTextColor};
  padding: 0px ${props => props.theme.padding};

  @media(max-width: 500px) {
    flex-direction: column;
  }
`

class StyledFooter extends React.Component<{}> {
  render() {
    return (
      <Fragment>
        <NewFooter>
          <Email />
          <Logo />
          <ConsenSys />
        </NewFooter>
      </Fragment>
    )
  }
}

export default StyledFooter
