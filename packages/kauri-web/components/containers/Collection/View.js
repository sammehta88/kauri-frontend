// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import CollectionHeader from '../../../../kauri-components/components/Headers/CollectionHeader.bs'
import CollectionSection from './CollectionSection.bs'
import ScrollToTopOnMount from '../../../../kauri-components/components/ScrollToTopOnMount/ScrollToTopOnMount.bs'
import { Link } from '../../../routes'
import { Helmet } from 'react-helmet'
import slugify from 'slugify'
import rake from 'rake-js'

type Props = {
  data: {
    collection?: CollectionDTO,
  },
  routeChangeAction: string => void,
  hostName: string,
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
  flex-wrap: wrap;
`

class CollectionPage extends Component<Props> {
  constructor (props) {
    super(props)
    this.state = {
      trianglify: null,
    }
  }
  componentDidMount () {
    const trianglify = require('trianglify')
    const trianglifyBg = trianglify({
      width: 1920,
      height: 400,
      cell_size: 60,
      variance: 1,
      x_colors: ['#0BA986', '#1E3D3B', '#1E2428'],
    })

    const generatedSvgString = new XMLSerializer().serializeToString(trianglifyBg.svg())
    const trianglifyBgString = 'data:image/svg+xml;base64,' + window.btoa(generatedSvgString)
    this.setState({ trianglifyBg: trianglifyBgString })
  }

  render () {
    if (!this.props.data || !this.props.data.collection) return null
    const { name, background, description, date_created, date_updated, owner, sections } = this.props.data.collection
    const { routeChangeAction, hostName } = this.props
    const extractedKeywords = rake(description, { language: 'english' })
    const bg = background || this.state.trianglifyBg
    const url = `https://${hostName.replace(/api\./g, '')}/collection/${this.props.id}/${slugify(name, { lower: true })}`;

    return (
      <div>
        <Helmet>
          <title>{name} - Kauri</title>
          <meta name='description' content={`${description.slice(0, 151)}...`} />
          <meta name='keywords' content={extractedKeywords.map(i => i)} />
          <link rel='canonical' href={url} />
        </Helmet>
        <ScrollToTopOnMount />
        <HeaderContainer background={bg}>
          <CollectionHeader
            name={name}
            description={description}
            updated={date_updated || date_created}
            username={owner.username}
            linkComponent={childrenProps => (
              <Link useAnchorTag route={`/public-profile/${owner && owner.user_id}`}>
                {childrenProps}
              </Link>
            )}
            userId={owner.user_id}
            url={url}
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
                description={i.description}
                articles={i.articles}
              />
            ))}
        </ContentContainer>
      </div>
    )
  }
}

export default CollectionPage
