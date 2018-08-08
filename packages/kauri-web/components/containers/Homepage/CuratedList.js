import styled from 'styled-components';
import moment from 'moment';
import ArticleCard from '../../../../kauri-components/components/Card/ArticleCard.bs'
import CollectionCard from '../../../../kauri-components/components/Card/CollectionCard.bs'
import CommunityCard from '../../../../kauri-components/components/Card/CommunityCard.bs'
import theme from '../../../lib/theme-config';


const Title = styled.h2`
    font-weight: 300;
    font-size: 22px;
    text-transform: capitalize;
    margin-top: 0px;
    color: ${props => props.featured ? 'white' : '#1e2428'};
`;

const Container = styled.div`
    background: ${ props => props.featured ? '#6552CE' : 'transparent'};
    width: 100%;
    padding: ${props => props.theme.paddingTop} ${props => props.theme.padding};
    text-align: center;
`;

const Description = styled.div`
    font-size: 16px;
    font-weight: normal;
    color: ${props => props.featured ? 'white' : '#1e2428'};
    margin-bottom: 18px;
`;

const Resources = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

const Header = styled.div`
flex: 1;
background: red;
color: white
`;

const CuratedList = ({ routeChangeAction, content: { name, description, resources, featured, header, header_id } } = props) =>
    <Container featured={featured}>
        <Title featured={featured}>{name}</Title>
        {description && <Description featured={featured}>{description}</Description>}
        {resources &&
            <Resources>
                { header && <Header>HEADER GOES HERE</Header>}
                {resources.map(i => {
                    switch (i.type) {
                        case "ARTICLE":
                            return <ArticleCard
                                changeRoute={routeChangeAction}
                                key={i.article_id}
                                date={moment(i.date_created).fromNow()}
                                title={i.subject}
                                content={i.text}
                                username={i.user.username}
                                articleId={i.article_id}
                                articleVersion={i.article_version}
                            />
                        case "COLLECTION":
                            const articles = i.sections.reduce((a, b) => {
                                a += b.article_id.length;
                                return a;
                            }, 0);
                            return <CollectionCard
                                changeRoute={routeChangeAction}
                                key={i.id}
                                collectionName={i.name}
                                articles={articles}
                                lastUpdated={moment(i.date_created).fromNow()}
                                collectionId={i.id}
                                collectionDescription={i.description}
                            />
                        case ("TOPIC" || "COMMUNITY"):
                            const topic = theme[i.id];
                            if (!topic) return null;

                            return <CommunityCard
                                changeRoute={routeChangeAction}
                                key={i.id}
                                communityName={i.name || i.id}
                                articles={8}
                                communityId={i.id}
                                communityLogo={`/static/images/${i.id}/avatar.png`}
                            />
                        default:
                            return null;
                    }
                })}
            </Resources>}
    </Container>;

export default CuratedList;