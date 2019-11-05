import React, { useEffect } from 'react';
import styled from 'styled-components';
import NatureImage from '../../../img/nature-image.jpg';
import PeopleTalking from '../../img/people-talking.png';
import LinkBox from './LinkContainer';
import PlaceHolder from '../../../img/placeholder.png';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
   height: 100vh;
   display: flex;
   justify-content: center;
`;

const TopPart = styled.div`
    background-size: 100%;
    background-repeat: no-repeat;
    height: fit-content;
    width: 100%;
    margin: auto;
`;

const LookForActvitsButtonContainer = styled.div`
    @media (max-width: 768px) {
        
    }
    height: fit-content;
    width: 100%;
    display: flex;
`;

const PageQuote = styled.h1`
    width: 100%;
    margin: 0 auto;
    text-align: center;
    font-size: 4em;
    @media (max-width: 768px) {
        font-size: 2.75em;
        margin-bottom: 0em;
    }
    /* color: white; */
  
    height: fit-content;
    display: inline-block;
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
    margin-top: 2em;
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

function HomePage() {
    return (
        <PageContainer>
            <TopPart>
                <PageQuote>"Never doubt that a <BlueHighlight>small group</BlueHighlight> of thoughtful committed citizens can <BlueHighlight>change the world</BlueHighlight>"<br/><QuoteAuthor>Margaret Mead</QuoteAuthor></PageQuote>
                <LookForActvitsButtonContainer>
                    <LookForActvitsButton to = '/search'>Find Activists</LookForActvitsButton>
                </LookForActvitsButtonContainer>
            </TopPart>
        </PageContainer>
    );
}

const mapStateToProps = (state: any) => {
    return {
      user: state.user
    }
}

export default connect(mapStateToProps)(HomePage);
