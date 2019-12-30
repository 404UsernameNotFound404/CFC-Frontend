import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ActvistOfWeek from './ActvistOfWeek'
import Events from './Events'
import HomePagePhoto from '../../../img/protest.jpg'

const PageContainer = styled.div`
    width: 75em;
    margin: auto;
    @media (max-width: 768px) {
        width: 95%;    
    }
`;

const TopPart = styled.div`
    padding-top: 8em;
    background-size: 100%;
    background-repeat: no-repeat;
    height: fit-content;
    width: 100%;
    margin: auto;
    text-align: center;
`;

const LookForActvitsButtonContainer = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
`;

const PageTitle = styled.h1`
    width: 100%;
    margin: 0 0;
    font-size: 6em;
    @media (max-width: 768px) {
        font-size: 2.75em;
        margin-bottom: 0em;
    }
`;

const PageSubTitle = styled.h4`
    margin: 0;
    font-size: 3em;
    font-weight: bolder;
`;

const LookForActvitsButton = styled(Link)`
    cursor: pointer;
    border: black thin solid;
    color: black;
    font-size: 2em;
    width: fit-content;
    height: fit-content;
    padding: 0.5em 2em;
    border-radius: 1em;
    margin: 0em auto;
    margin-top: 1em;
    @media (max-width: 768px) { 
        margin-top: 1em;
    }
    transition: 0.3s background-color linear, 0.3s color linear;
    text-decoration: none;
    &:hover {
        background-color: #3c78d8;
        color: white;
        border-color: transparent;
    }
`;

const BlueHighlight = styled.span`
    color: #3c78d8;
`;

const ActvistsAndEventsContainer = styled.div`
    display: flex;
    margin-bottom: 2em;
`;

const TopPartTextContainer = styled.div`
    width: 72%;
`;

const HomePageImage = styled.img`
    width: 28%;
    height: 30em;
    object-fit: cover;
    border: 0.2em solid black;
    border-radius: 0.2em;
`;

const PagePara = styled.p`
    font-size: 1.5em;
    width: 85%;
    margin: auto;
    margin-top: 0.5em;
`;

function HomePage() {
    return (
        <PageContainer>
            <TopPart>
                <PageTitle>This is about<BlueHighlight> connections.</BlueHighlight></PageTitle>
                <PageSubTitle>This is about working for a just world, together.</PageSubTitle>
                <PagePara>
                    This is about creating a website to help connect activists together. We hope to do this by allowing activists to create accounts and learn about groups interested in the same causes. Whether you are just getting involved, or have been an activist for decades, we want to help you change the world.
                </PagePara>
                <LookForActvitsButtonContainer>
                    <LookForActvitsButton to='/search'>Find Activists</LookForActvitsButton>
                </LookForActvitsButtonContainer>
            </TopPart>
            <ActvistsAndEventsContainer>
                <ActvistOfWeek />
                <Events />
            </ActvistsAndEventsContainer>
        </PageContainer>
    );
}

export default HomePage;
