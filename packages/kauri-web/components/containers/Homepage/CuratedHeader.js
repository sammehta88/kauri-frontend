import styled from 'styled-components'
import theme from '../../../lib/theme-config'
import { Link } from '../../../routes'

const Header = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  color: white;
  margin-right: 15px;
  align-items: flex-start;
  text-align: left;
`

const ListTitle = styled.h2`
  font-weight: 300;
  font-size: 22px;
  text-transform: capitalize;
  margin-top: 0px;
  color: white;
  margin-top: 20px;
`

const CommunityHeading = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const CommunityLogo = styled.img`
  background: white;
  border-radius: 4px;
  height: 70px;
  width: 70px;
  padding: 10px;
  margin: 10px 20px 20px 0;
`

const CommunityName = styled.h3`
  color: white;
  text-transform: capitalize;
  font-weight: bold;
  font-size: 30px;
`

const Button = styled.div`
  padding: 10px 20px;
  border: 1px solid white;
  font-weight: 600;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 11px;
  margin-top: 10px;
  cursor: pointer;
  opacity: 0.6;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
  }
`

const CuratedHeader = ({ header, name } = props) => {
  const topic = theme[header.id]
  const imageURL = `/static/images/${header.id}/avatar.png`

  switch (header && header.type) {
    case 'TOPIC' || 'COMMUNITY':
      return (
        <Header>
          <ListTitle>{name}</ListTitle>
          <CommunityHeading>
            <CommunityLogo src={imageURL} />
            <CommunityName>{header.id}</CommunityName>
          </CommunityHeading>
          <div>{topic.description}</div>
          <Link route={`/community/${header.id}`}>
            <Button>View Community</Button>
          </Link>
        </Header>
      )
    case 'COLLECTION':
      return (
        <Header background={header.background}>
          <ListTitle>{name}</ListTitle>
          <CommunityHeading>
            <CommunityName>{header.name}</CommunityName>
          </CommunityHeading>
          <div>{header.description}</div>
          <Link route={`/collection/${header.id}`}>
            <Button>View Collection</Button>
          </Link>
        </Header>
      )
    default:
      return null
  }
}

export default CuratedHeader
