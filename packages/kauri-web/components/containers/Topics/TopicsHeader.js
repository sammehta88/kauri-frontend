// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { Button } from 'antd'
import { hideIntroBannerAction } from '../../../lib/Module'
import { Badge } from '../../common/ActionBadge'

const slideUpCss = css`
  overflow-y: hidden;
  max-height: ${props => (props.showIntroBanner ? '360px' : '0px')};
  padding-top: ${props => !props.showIntroBanner && '0px'};
  padding-bottom: ${props => !props.showIntroBanner && '0px'};
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
`

const categoryTabCss = css`
  max-height: 231px;
  padding-top: 0px;
  padding-bottom: 0px;
  > :first-child {
    margin-bottom: 0px;
  }
`

const Container = styled.section`
  display: flex;
  height: 360px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 35px;
  background-color: ${props => props.theme.secondaryColor};
  > * {
    color: #fff;
  }
  ${slideUpCss};
  ${props => props.categoryTab && categoryTabCss};
`

const Indicator = Badge.extend`
  width: 220px;
  text-align: center;
  h4 {
    margin-top: 7px;
    height: 24px;
    line-height: 24px;
    font-size: 18px;
    font-weight: 500;
    color: #fff;
  }
  span {
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
  }
  > :last-child {
    text-transform: none;
  }
`

const Icon = styled.img`
  max-height: 45px;
  max-width: 80px;
`

const Indicators = styled.div`
  display: flex;
  flex-direction: row;
  div:not(:first-child) {
    margin-left: 90px;
  }
  margin-bottom: 40px;
`

const Title = styled.h2`
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 50px;
`

const CloseButton = styled(Button)`
  width: 182px;
  height: 40px !important;
  background-color: transparent !important;
  box-sizing: border-box;
  border-width: 1px !important;
  border-style: solid !important;
  border-color: ${props => props.theme.primaryColor} !important;
  border-radius: 4px !important;
  font-size: 11px !important;
  font-style: normal !important;
  font-weight: 500 !important;
  color: #fff !important;
  .ant-btn:focus,
  .ant-btn:active,
  .ant-btn.active,
  * {
    background-color: transparent;
  }
  :hover {
    background-color: ${props => props.theme.primaryColor} !important;
    color: #fff;
  }
`

const DescriptionText = styled.span`
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #fff;
`

export const TopicsHeader = {
  Container,
  Indicators,
  Indicator,
  Icon,
  Title,
  CloseButton,
}

type Props = {
  hideIntroBannerAction: () => void,
  showIntroBanner: boolean,
}

const TopicHeader = (props: Props) => (
  <TopicsHeader.Container showIntroBanner={props.showIntroBanner}>
    <TopicsHeader.Title>Kauri Features</TopicsHeader.Title>
    <TopicsHeader.Indicators>
      <TopicsHeader.Indicator>
        <TopicsHeader.Icon src='/static/images/browse-topics.png' />
        <h4>Browse Topics</h4>
        <DescriptionText>Find trusted written and up to date knowledge based articles</DescriptionText>
      </TopicsHeader.Indicator>
      <TopicsHeader.Indicator>
        <TopicsHeader.Icon src='/static/images/request-articles.png' />
        <h4>Request</h4>
        <DescriptionText>Request articles for the community</DescriptionText>
      </TopicsHeader.Indicator>
      <TopicsHeader.Indicator>
        <TopicsHeader.Icon src='/static/images/contribute.png' />
        <h4>Contribute</h4>
        <DescriptionText>Help the community by providing expert advice and help knowledge</DescriptionText>
      </TopicsHeader.Indicator>
      <TopicsHeader.Indicator>
        <TopicsHeader.Icon src='/static/images/support.png' />
        <h4>Support (Late 2018)</h4>
        <DescriptionText>Find trusted written and up to date knowledge based articles</DescriptionText>
      </TopicsHeader.Indicator>
    </TopicsHeader.Indicators>
    <TopicsHeader.CloseButton onClick={props.hideIntroBannerAction}>X CLOSE</TopicsHeader.CloseButton>
  </TopicsHeader.Container>
)

const mapStateToProps = state => ({ showIntroBanner: state.app.showIntroBanner })

export default connect(mapStateToProps, { hideIntroBannerAction })(TopicHeader)
