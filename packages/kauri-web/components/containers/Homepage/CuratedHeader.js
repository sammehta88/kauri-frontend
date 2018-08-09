import styled from 'styled-components';
import theme from '../../../lib/theme-config';

const Header = styled.div`
    flex: 1;
    background: red;
    color: white;
    margin-right: 15px;
`;

const CuratedHeader = ({ header, name } = props) => {
    const topic = theme[header.id];
    const imageURL = `/static/images/${header.id}/avatar.png`;

    return(
        <Header>
            {name}
            <div>{header.id}</div>
            <img src={imageURL} />
            <div>{topic.description}</div>
        </Header>
    );
}

export default CuratedHeader;