// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import CollectionHeader from '../../../../kauri-components/components/Headers/CollectionHeader.bs'
import CollectionSection from './CollectionSection.bs'
import ScrollToTopOnMount from '../../../../kauri-components/components/ScrollToTopOnMount/ScrollToTopOnMount.bs'
import { Helmet } from "react-helmet";
import slugify from 'slugify';


type Props = {
  data: {
    collection?: CollectionDTO,
  },
  routeChangeAction: string => void,
}

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
`

const HeaderContainer = styled(ContentContainer)`
  background: url(${props => props.background}) center center;
  background-size: cover;
  margin-top: -76px;
  padding-top: 106px;
  padding-bottom: 50px;
  box-shadow: inset 0px 0px 140px 120px rgba(0, 0, 0, 0.5);
`

class CollectionPage extends Component<Props> {
  render() {
    if (!this.props.data || !this.props.data.collection) return null
    const { name, background, description, date_created, date_updated, owner, sections } = this.props.data.collection
    const { routeChangeAction } = this.props;

    const hostname = process.env.monolithExternalApi.includes('rinkeby') ? 'https://rinkeby.kauri.io' : 'https://dev.kauri.io';
    return (
      <div>
        <Helmet>
          <title>{name} - Kauri</title>
          <meta name="description" content={`${description.slice(0, 151)}...`} />
          <link rel="canonical" href={`${hostname}/collection/${this.props.id}/${slugify(name, { lower: true })}`} />
        </Helmet>
        <ScrollToTopOnMount />
        <HeaderContainer background={background}>
          <CollectionHeader
            name={name}
            description={description}
            updated={date_updated || date_created}
            username={owner.username}
            userId={owner.user_id}
            profileImage={owner.profileImage}
            routeChangeAction={routeChangeAction}
          />
        </HeaderContainer>
        <ContentContainer>
          {sections &&
            sections.map(i => (
              <CollectionSection
                name={i.name}
                key={i.name}
                routeChangeAction={this.props.routeChangeAction}
                description={i.description}
                articles={i.articles}
                linkComponent={childrenProps => (
                  <Link useAnchorTag route={`/article/${card.article_id}/v${card.article_version}`}>
                    {childrenProps}
                  </Link>
                )}
              />
            ))}
        </ContentContainer>
      </div>
    )
  }
}

export default CollectionPage
