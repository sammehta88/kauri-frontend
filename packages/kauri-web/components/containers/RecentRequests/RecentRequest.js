// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import Web3 from 'web3'
import DescriptionRow from '../../common/DescriptionRow'
import { Link } from '../../../routes'
import { Subject } from '../OpenRequests/OpenRequest'
import DatePosted from '../../common/DatePosted'

const web3 = new Web3()

type Props = { ethUsdPrice: number } & RequestDTO

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  > :first-child {
    margin-right: 9px;
  }
  > :last-child {
    margin-left: auto;
  }
  margin-bottom: 20px;
`

const Icon = styled.img`
  max-height: 17px;
  max-width: 17px;
`

const BountyContainer = styled.div`
  display: flex;
  > :first-child {
    color: ${props => props.theme.secondaryTextColor};
    font-size: 13px;
    font-weight: bold;
    line-height: 18px;
  }
  > :last-child {
    margin-left: 8px;
    color: ${props => props.theme.primaryTextColor};
    font-size: 13px;
    line-height: 18px;
  }
`

const Bounty = ({ bounty, ethUsdPrice }: *) => (
  <BountyContainer>
    <strong>{`${web3 && web3.fromWei(bounty, 'ether')} ETH`}</strong>
    <span>{`$${(web3.fromWei(bounty, 'ether') * ethUsdPrice || 0).toFixed(2)}`}</span>
  </BountyContainer>
)

const Category = styled.strong`
  color: ${props => props.theme.secondaryTextColor};
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
`

const Header = ({ category, bounty, ethUsdPrice }: *) => (
  <HeaderContainer>
    <Icon src={`/static/images/${category}/avatar.png`} />
    <Category>{category && category.toUpperCase()}</Category>
    <Bounty bounty={bounty} ethUsdPrice={ethUsdPrice} />
  </HeaderContainer>
)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 120px;
`

const RestrictToOneLine = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export default (props: Props) => (
  <Container>
    <Header category={props.category} bounty={props.bounty} ethUsdPrice={props.ethUsdPrice} />
    <RestrictToOneLine>
      <Link route={`/request/${props.request_id}`}>
        <Subject href={`/request/${props.request_id}`} recentRequest>
          {props.subject}
        </Subject>
      </Link>
    </RestrictToOneLine>
    <DescriptionRow recentRequest record={{ text: props.text }} />
    <DatePosted recentRequest>
      <span>EXPIRE{moment(props.dead_line).isBefore() ? 'D' : 'S'}</span>
      <strong>{`${moment(props.dead_line).fromNow()} ${moment(props.dead_line).format('(DD MMM YYYY)')}`}</strong>
    </DatePosted>
  </Container>
)
