import styled from 'styled-components'
import moment from 'moment'
import ArticleCard from '../../../../kauri-components/components/Card/ArticleCard.bs'
import CollectionCard from '../../../../kauri-components/components/Card/CollectionCard.bs'
import CommunityCardConnection from '../../connections/Community/CommunityCard_Connection.bs'
import theme from '../../../lib/theme-config'
import CuratedHeader from './CuratedHeader'
import { Link } from '../../../routes'

const Title = styled.h2`
  font-weight: 300;
  font-size: 22px;
  text-transform: capitalize;
  margin-top: 0px;
  color: ${props => (props.featured ? 'white' : '#1e2428')};
`

const Container = styled.div`
  background: ${props => (props.background ? `url(${props.background}) center center` : props.bgColor)};
  background-size: cover;
  box-shadow: ${props => (props.background ? 'inset 0px 0px 140px 120px rgba(0, 0, 0, 0.5)' : 'none')};
  width: 100%;
  padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
  text-align: center;
`

const Resources = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const getBG = (header, featured) => {
  if (featured && header && header.type === ('TOPIC' || 'COMMUNITY')) {
    return theme[header.id].primaryColor
  } else if (featured) {
    return '#0BA986'
  } else {
    return 'transparent'
  }
}

const HOMEPAGE_CARD_HEIGHT = 500

const CuratedList = ({ routeChangeAction, content: { name, resources, featured, header } } = props) => {
  return (
    <Container bgColor={getBG(header, featured)} featured={featured} background={header && header.background}>
      {!header && <Title featured={featured}>{name}</Title>}
      {resources && (
        <Resources>
          {header && <CuratedHeader name={name} header={header} />}
          {resources.map(card => {
            switch (card.type) {
              case 'ARTICLE':
                return (
                  <ArticleCard
                    changeRoute={routeChangeAction}
                    key={card.article_id}
                    date={moment(card.date_created).fromNow()}
                    title={card.subject}
                    content={card.text}
                    userId={card.user.user_id}
                    username={card.user.username}
                    articleId={card.article_id}
                    articleVersion={card.article_version}
                    cardHeight={HOMEPAGE_CARD_HEIGHT}
                    linkComponent={(childrenProps, route) => (
                      <Link toSlug={route.includes('article') && card.subject} useAnchorTag route={route}>
                        {childrenProps}
                      </Link>
                    )}
                  />
                )
              case 'COLLECTION':
                const articles = card.sections.reduce((acc, item) => {
                  acc += item.article_id.length
                  return acc
                }, 0)
                return (
                  <CollectionCard
                    changeRoute={routeChangeAction}
                    key={card.id}
                    collectionName={card.name}
                    username={card.owner.username}
                    userId={card.owner.user_id}
                    articles={articles}
                    lastUpdated={moment(card.date_created).fromNow()}
                    collectionId={card.id}
                    imageURL={card.background}
                    profileImage={card.profileImage}
                    cardHeight={HOMEPAGE_CARD_HEIGHT}
                    collectionDescription={card.description}
                    linkComponent={childrenProps => (
                      <Link toSlug={card.name} useAnchorTag route={`/collection/${card.id}`}>
                        {childrenProps}
                      </Link>
                    )}
                  />
                )
              case 'TOPIC' || 'COMMUNITY':
                const topic = theme[card.id]
                if (!topic) return null

                return (
                  <CommunityCardConnection
                    changeRoute={routeChangeAction}
                    key={card.id}
                    communityName={card.name || card.id}
                    communityId={card.id}
                    cardHeight={HOMEPAGE_CARD_HEIGHT}
                    communityLogo={`/static/images/${card.id}/avatar.png`}
                    linkComponent={childrenProps => (
                      <Link toSlug={card.name || card.id} useAnchorTag route={`/community/${card.id}`}>
                        {childrenProps}
                      </Link>
                    )}
                  />
                )
              default:
                return null
            }
          })}
        </Resources>
      )}
    </Container>
  )
}

export default CuratedList
