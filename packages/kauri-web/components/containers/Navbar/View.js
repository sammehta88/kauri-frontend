import React from 'react'
import { Menu, Button } from 'antd'
import styled, { css } from 'styled-components'
import { Link } from '../../../routes'
import Web3Status from '../Web3Status'
// import ArticleSearchbar from '../ArticleSearchbar'

// const supportedNetworkIds = [4, 224895]
// const ONE_SECOND = 1000
// const TWENTY_SECONDS = ONE_SECOND * 20

export const menuHeaderHeight = 76

const StyledMenu = styled(Menu)`
  display: flex;
  height: ${menuHeaderHeight}px !important;
  line-height: ${menuHeaderHeight}px !important;
  background-color: ${props => props.confirmationPage && props.theme.secondaryColor};
`

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > :first-child {
    margin-right: 29px;
  }
`

const StyledMenuItem = styled(Menu.Item)`
  display: flex;
  color: #fff !important;
  padding: 0 15px;
  > a {
    color: #fff !important;
    :hover {
      ${props => props.theme.primaryColor} !important;
    }
  }
`

const LogoImage = styled.img`
  height: 30px;
  width: 30px;
`

const LogoWrapper = styled.div`
  display: flex;
  margin-right: 24px;
  align-items: center;
  cursor: pointer;
`

const Spacer = styled.div`
flex: 1;
`;

const Text = styled.a`
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
  text-decoration: none;
  height: 60px;
  border-bottom: ${props => (props.pathname === props.link ? '3px solid #0BA986' : 'none')};
  color: #fff;
  :hover {
    color: ${props => props.theme.primaryColor} !important;
  }
`

const GlobalCreateRequestButton = styled(Button)`
  align-self: center;
  width: 134px;
  height: 40px !important;
  background-color: #262c35 !important;
  border-color: #0ba986 !important;
  color: #fff !important;
  font-size: 11px !important;
  font-weight: bold !important;
  line-height: 16px !important;
  :hover {
    background-color: ${props => props.theme.primaryColor} !important;
    border-color: ${props => props.theme.primaryColor} !important;
  }
`

const ProfileMiniature = styled.div`
  background: white;
  color: #1E2428;
  height: 30px;
  width: 30px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;

class Logo extends React.Component {
  render () {
    return (
      <LogoWrapper>
        <LogoImage onClick={() => this.props.routeChangeAction('/')} src='/static/images/logo.svg' />
      </LogoWrapper>
    )
  }
}

export default class Navbar extends React.Component {
  render () {
    const { userId, routeChangeAction, user, url, confirmationPage } = this.props;
    return (
      <StyledMenu confirmationPage={confirmationPage} selectedKeys={[url.pathname]} theme='dark' mode='horizontal'>
        <Logo routeChangeAction={routeChangeAction} alt='logo' />
        <StyledMenuItem key='/'>
          <Link href='/'>
            <Text href='/' pathname={url.pathname} link='/'>
              HOME
            </Text>
          </Link>
        </StyledMenuItem>

        {user &&
          user.topics &&
          user.topics.length > 0 && (
            <StyledMenuItem key='/approvals'>
              <Link href={'/approvals'}>
                <Text href='/approvals' pathname={url.pathname} link='/approvals'>
                  Approvals
                </Text>
              </Link>
            </StyledMenuItem>
          )}

        <StyledMenuItem key='/topics'>
          <Link href='/topics'>
            <Text href='/topics' pathname={url.pathname} link='/topics'>
              Topics
            </Text>
          </Link>
        </StyledMenuItem>

        <StyledMenuItem key='/requests'>
          <Link href='/requests'>
            <Text href='/requests' pathname={url.pathname} link='/requests'>
              Requests
            </Text>
          </Link>
        </StyledMenuItem>
        <Spacer />

        <StyledMenuItem key='/write-article'>
          <Link route={userId ? '/write-article' : '/login'}>
            <Text href='/write-article' pathname={url.pathname} link='/write-article'>
              Write Article
            </Text>
          </Link>
        </StyledMenuItem>
        {/* <StyledMenuItem key='/create-request'>
          <Link route={userId ? '/create-request' : '/login'}>
            <GlobalCreateRequestButton data-test-id='create-request-navbar'>CREATE REQUEST</GlobalCreateRequestButton>
          </Link>
        </StyledMenuItem> */}

        <StyledMenuItem key='/profile'>
        {console.log(user.username)}
          {userId && userId.length ? (
            <Link href='/profile'>
              <ProfileContainer>
                <Web3Status />
                <ProfileMiniature>{user.username.substring(0,1)}</ProfileMiniature>
              </ProfileContainer>
            </Link>
          ) : (
            <Link href='/login'>
              <Text href='/login' data-test-id='login-navbar' pathname={url.pathname} link='/login'>
                Sign In
              </Text>
            </Link>
          )}
        </StyledMenuItem>
        <StyledMenuItem key='/help'>
          <Link href='/help'>
            <Text href='/help' pathname={url.pathname} link='/help'>
              Help
            </Text>
          </Link>
        </StyledMenuItem>
      </StyledMenu>
    )
  }
}
