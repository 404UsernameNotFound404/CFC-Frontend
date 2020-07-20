import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ActivistsOfWeek from './BlogRants';
import Events from './Events';

const PageContainer = styled.div`
    width: 75em;
    margin: auto;
    height: 100vh;
    display: flex;
    justify-content: center;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        width: 95%;    
    }
`;

const TopPart = styled.div`
    background-size: 100%;
    background-repeat: no-repeat;
    height: fit-content;
    width: 100%;
    margin: auto;
    text-align: center;
`;

const PageTitle = styled.h1`
    width: 100%;
    margin: 0 0;
    font-size: 6em;
    /* text-decoration: underline; */
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        font-size: 2.2em;
        margin-bottom: 0em;
    }
`;

const PageSubTitle = styled.h4`
    margin: 0;
    font-size: 3em;
    font-weight: lighter;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        font-size: 1.5em;
        margin-bottom: 0em;
    }
`;

const BlueHighlight = styled.span`
    color: #3c78d8;
`;

const PagePara = styled.p`
    font-size: 1.5em;
    width: 85%;
    margin: auto;
    margin-top: 0.5em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        font-size: 1.25em;
        margin-bottom: 0em;
    }
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
            </TopPart>
        </PageContainer>
    );
}

export default HomePage;
