// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import CuratedList from './CuratedList';

type Props = {
  data: {
    searchArticles?: {
      content: Array<?ArticleDTO>,
    },
  },
  routeChangeAction: string => void,
}

const ContentContainer = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const SearchPlaceholder = styled.div`
  background-color: #1E2428;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
`
const KauriTitle = styled.h1`
  color: white;
  font-weight: 300;
  font-size: 32px;
  margin-top: 45px;
  margin-bottom: 12px;
`

const FakeSearchBox = styled.div`
  border-radius: 4px;
  border: 1px solid white;
  height: 40px;
  width: 300px;
  margin-top: 25px;
  margin-bottom: 64px;
`;

class Homepage extends Component<Props> {
  static ContentContainer = ContentContainer

  render () {
    if (!this.props.data || !this.props.data.getAllCuratedList) {
      return null;
    } //TODO replace with an error message if exists

    const { getAllCuratedList } = this.props.data;

    return (
      <ContentContainer>
        <SearchPlaceholder>
          <KauriTitle>Learn to build on Ethereum with Kauri</KauriTitle>
          <div>Articles, tutorials, Documentation and best practices</div>
          <FakeSearchBox />
        </SearchPlaceholder>
          {getAllCuratedList.map((i) => <CuratedList routeChangeAction={this.props.routeChangeAction} key={i.id} content={i} />)}
      </ContentContainer>
    )
  }
}

export default Homepage
