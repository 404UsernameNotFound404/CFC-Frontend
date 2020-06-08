import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './header';
import Categories, {CategoryButtonProps, CategoryButtonStyleProps} from '../categories-react/Categories';
// import PageCategories from '../../Page/PageCategories';
// import CreatingOrg from '../creatingOrg';
// import ContactModal from '../../Page/ContactModal';

type ContainerProps = {
    width: string
}

const Container = styled.div<ContainerProps>`
    position: relative;
    border: black 0.2rem solid;
    background-color: #f9f9f9;
    width: ${p => p.width};
    padding: 1%;
    margin: 0.5%;
    border-radius: 1em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        border-width: 1%;
        width: 90%;
        margin: 1.5em 0;
        padding: 4%;
    }
    transition: all 1s;
`;

type DescProps = {
    showAll: boolean
}

const Desc = styled.p<DescProps>`
    font-size: 1em;
    width: 90%;
    margin-top: 0.25em;
    margin-bottom: 0.5em;
    height: ${p => p.showAll ? 'auto' : '4.1em'};
    overflow:  ${p => p.showAll ? 'visible' : 'hidden'};
    text-overflow: ${p => p.showAll ? 'none' : 'ellipsis'};;
    display: ${p => p.showAll ? 'block' : '-webkit-box'};
    -webkit-box-orient: ${p => p.showAll ? '' : 'vertical'};
    -webkit-line-clamp: ${p => p.showAll ? '99' : '3'};
`;

const SeeMore = styled.h4`
    color: #007aa2;
    font-size: 1em;
    margin: 0;
    width: fit-content;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const LinkToWebite = styled.a`
    font-size: 1.25em;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const RequestChange = styled.div`
    width: fit-content;
    padding: 0.5em 0.75em;
    color: #3c78d8;
    border-radius: 0.3em;
    /* background-color: #3c78d8; */
    border: thin solid #3c78d8;
    cursor: pointer;
    font-size: 1em;
    &:hover {
        color: #183e7c;
        background-color: #3c78d81f;
        border-color: #183e7c;
    }
`;

const CategoryButtonStyle = styled.div<CategoryButtonStyleProps>`
    cursor: default;
    background-color: ${p => p.colour};
    border-radius: 0.25em;
    width: 30%;
    padding: 0.5rem 0;
    margin: 0 1.2%;
    margin-bottom: 0.5rem;
    text-align: center;
    justify-content: center;
    color: black;
    font-size: 0.73em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        padding: 1em 1%;
        width: 8em;
    }
    display: flex;
    justify-content: center;
`;

const CategoryContainer = styled.div`
    margin: 1rem 0;
`;

const CategoryButton = (props: CategoryButtonProps) => {
    const {Name, Colour, Active} = props;
    return (
        <CategoryButtonStyle active = {Active} colour = {Colour}>
            {Name}
        </CategoryButtonStyle>
    )
}

export type ActionButtonProps = {
    ActionButtonOnClick: (orgId: string) => void;
    id: string;
}

type Props = {
    name: string,
    desc: string,
    link: string,
    location: string,
    interests: { Name: string, Colour: string, ID: string }[],
    image: string,
    email: string,
    _id: string,
    width?: string,
    ActionButton?: (props: ActionButtonProps) => JSX.Element;
    ActionButtonOnClick: (orgId: string) => void;
}

function OrganizationCard(props: Props) {
    const [seeMore, setSeeMore] = useState(false);
    const {desc, link, _id, ActionButtonOnClick} = props;
    const width = props.width ? props.width : "27%";
    const ActionButton = props.ActionButton ? props.ActionButton : () => <></>;

    return (
        <Container width = {width}>
            <Header {...props} />
            <Desc showAll={seeMore}>{props.desc.length >= 100 && !seeMore ? (props.desc.substring(0, 100) + "...") : desc}</Desc>
            {desc.length >= 100 ? <SeeMore onClick={() => { setSeeMore(!seeMore) }}>{!seeMore ? 'See More' : 'See Less'}</SeeMore> : <div style={{ height: '1.3em' }}></div>}
            <LinkToWebite href={link}>{link.length >= 35 ? (link.substring(0, 35) + "...") : link}</LinkToWebite>
            <CategoryContainer> <Categories onlyShowActive justifyContent = {"space-between"} CategoryButton = {CategoryButton} activeCategories = {props.interests.map(ele => parseInt(ele.ID))} changeCategory = {() => {}} /> </CategoryContainer>
            <ActionButton id = {_id} ActionButtonOnClick = {ActionButtonOnClick} />
        </Container>
    );
}

export default OrganizationCard;
