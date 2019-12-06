import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ActvistOfWeek  from './ActvistOfWeek'
import Events from './Events'

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
`;

const LookForActvitsButtonContainer = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
`;

const PageTitle = styled.h1`
    width: 100%;
    margin: 0 0;
    text-align: center;
    font-size: 6em;
    @media (max-width: 768px) {
        font-size: 2.75em;
        margin-bottom: 0em;
    }
`;

const PagePara = styled.h4`
    margin: 0;
    text-align: center;
    font-size: 3em;
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
    transition: all 0.4s ease 0s;
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

const QuoteAuthor = styled.span`
    font-size: 0.75em;
    color: grey;
    font-weight: bolder;
`;

const ActvistsAndEventsContainer = styled.div`
    display: flex;
    margin-bottom: 2em;
`;

function HomePage() {
    return (
        <PageContainer>
            <TopPart>
                <PageTitle>This is about<BlueHighlight> connections.</BlueHighlight></PageTitle>
                <PagePara>This is about working for a just world, together.</PagePara>
                <LookForActvitsButtonContainer>
                    <LookForActvitsButton to = '/search'>Find Activists</LookForActvitsButton>
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
