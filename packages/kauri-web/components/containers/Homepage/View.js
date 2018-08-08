// @flow
import React, { Component } from 'react'
import styled from 'styled-components'

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
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`

const CuratedList = ({ content: {name, description, resources, header, header_id} } = props) =>
<div>
  <h2>{name}</h2>
  <p>{description}</p>
  {resources.map(i => <div key={i.id}>{i.name || i.subject || i.id}</div>)}
</div>;

class Homepage extends Component<Props> {
  static ContentContainer = ContentContainer

  render () {
    if (!this.props.data || !this.props.data.getAllCuratedList) {
      return null;
    } //TODO replace with an error message if exists

    const { getAllCuratedList } = this.props.data;

    return (
      <section>
        <Homepage.ContentContainer>
          {getAllCuratedList.map((i) => <CuratedList key={i.id || i.article_id} content={i} />)}
        </Homepage.ContentContainer>
      </section>
    )
  }
}

export default Homepage
