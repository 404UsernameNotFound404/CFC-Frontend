import React from 'react';
import styled from 'styled-components';
import NatureImage from '../../../img/nature-image.jpg';
import PeopleTalking from '../../img/people-talking.png';
import LinkBox from './LinkContainer';
import PlaceHolder from '../../../img/placeholder.png';

const PageContainer = styled.div`
   
`;

const TopPart = styled.div`
    /* background-image: url(${NatureImage}); */
    background-size: 100%;
    background-repeat: no-repeat;
    height: 98vh;
    width: 100%;
    overflow: hidden;
    position: relative;
`;

const QuoteContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const LookForActvitsButtonContainer = styled.div`
    position: absolute;
    bottom: 10em;
    height: fit-content;
    width: 100%;
`;

const PageQuote = styled.h1`
    width: 95%;
    margin: auto;
    text-align: center;
    font-size: 4em;
    /* color: white; */
    font-family: 'Cormorant Garamond', serif;
    height: fit-content;
    display: inline-block;
`;

const LinksContainer = styled.div`
    width: 75em;
    margin: auto;
    display: flex;
    justify-content: center;
`;

const LookForActvitsButton = styled.div`
    cursor: pointer;
    border: black thin solid;
    color: black;
    font-size: 2em;
    width: fit-content;
    height: fit-content;
    padding: 0.5em 2em;
    border-radius: 1em;
    margin: 0.5em auto;
    transition: all 0.4s ease;
    &:hover {
        background-color: #3c78d8;
        color: white;
        border-color: transparent;
    }
`;

const BlueHighlight = styled.span`
    color: #3c78d8;
`;

function HomePage() {
    return (
        <PageContainer>
            <TopPart>
                <QuoteContainer>
                    <PageQuote>"Without <BlueHighlight>activists</BlueHighlight> where would we be. activists where would we be."</PageQuote>
                </QuoteContainer>
                <LookForActvitsButtonContainer>
                    <LookForActvitsButton>Find Actvists</LookForActvitsButton>
                </LookForActvitsButtonContainer>
            </TopPart>
            <LinksContainer>
                <LinkBox left={true} desc={'Learn about the issues'} backgroundImage={PlaceHolder} />
                <LinkBox left={false} desc={'Blog'} backgroundImage={PlaceHolder} />
            </LinksContainer>
        </PageContainer>
    );
}

export default HomePage;
