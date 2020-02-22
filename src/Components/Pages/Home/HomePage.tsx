import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ActivistsOfWeek from './ActvistOfWeek'
import Events from './Events'
import HomePagePhoto from '../../../img/protest.jpg'

const PageContainer = styled.div`
    width: 75em;
    margin: auto;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
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

const LookForActivistButtonContainer = styled.div`
    height: fit-content;
    width: 75%;
    margin: auto;
    display: flex;
    margin-top: 0em;
    margin-bottom: 4em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        display: block;
    }
`;

const PageTitle = styled.h1`
    width: 100%;
    margin: 0 0;
    font-size: 6em;
    /* text-decoration: underline; */
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        font-size: 2.75em;
        margin-bottom: 0em;
    }
`;

const PageSubTitle = styled.h4`
    margin: 0;
    font-size: 3em;
    font-weight: lighter;
`;

const LookForActivistButton = styled(Link)`
    cursor: pointer;
    border: black thin solid;
    color: black;
    font-size: 1.9em;
    width: 6.5em;
    height: 6.5em;
    border-radius: 1em;
    margin: 0em auto;
    margin-top: 1em;
    transition: 0.3s background-color linear, 0.3s color linear;
    text-decoration: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    &:hover {
        background-color: #3c78d8;
        color: white;
        border-color: transparent;
    }
     @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        padding: 0;
        margin: auto;
        margin-top: 1em;
        border: black 0.1em solid;
    }
`;

const LookForActivistButtonText = styled.h1`
    font-size: 1em;
    margin: auto;
`;

const BlueHighlight = styled.span`
    color: #3c78d8;
`;

const ActivistsAndEventsContainer = styled.div`
    display: flex;
    margin-bottom: 2em;
`;

const PagePara = styled.p`
    font-size: 1.5em;
    width: 85%;
    margin: auto;
    margin-top: 0.5em;
`;

const SearchFor = styled.h1`
    text-align: center;
    font-size: 4em;
    margin: 0;
    margin-top: 1em;
`;

function HomePage() {
    return (
        <PageContainer>
            <TopPart>
                <PageTitle>This is about<BlueHighlight> connections.</BlueHighlight></PageTitle>
                <PageSubTitle>This is about working for a just world, together.</PageSubTitle>
                <SearchFor>Search For</SearchFor>
                <LookForActivistButtonContainer>
                    <LookForActivistButton to={'/search?search=' + "Activists"}><LookForActivistButtonText>Activists</LookForActivistButtonText></LookForActivistButton>
                    <LookForActivistButton to={'/search?search=' + "Organizations"}><LookForActivistButtonText>Organizations</LookForActivistButtonText></LookForActivistButton>
                    {/* <LookForActivistButton to={'/search?search=' + "Events"}><LookForActivistButtonText>Events</LookForActivistButtonText></LookForActivistButton> */}
                </LookForActivistButtonContainer>
                <PagePara>
                    This is about creating a website to help connect activists together. We hope to do this by allowing activists to create accounts and learn about groups interested in the same causes. Whether you are just getting involved, or have been an activist for decades, we want to help you change the world.
                </PagePara>
            </TopPart>
            <ActivistsAndEventsContainer>
                <ActivistsOfWeek />
                <Events />
            </ActivistsAndEventsContainer>
        </PageContainer>
    );
}

export default HomePage;
