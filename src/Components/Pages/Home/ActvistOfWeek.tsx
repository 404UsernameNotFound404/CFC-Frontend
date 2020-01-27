import React, { useEffect } from 'react';
import styled from 'styled-components';
import ActivstPhoto from '../../../img/greta.jpg'

const Component = styled.div`
    width: 47%;
    margin-right: 3%;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        width: 50%;
    }
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        display: inline-block;
    }
    height: 20em;
`;

const Name = styled.h1`
    font-size: 2.5em;
    margin: 0;
    color: #248328;
`;

const ShortDesc = styled.h4`
    font-size: 1.5em;
    margin: 0;
`;

const Title = styled.h1`
    font-size: 3em;
    text-align: center;
    text-decoration: underline;
`;

const LongDescription = styled.p`
    font-family: "Times New Roman", Times, serif;
    font-size: 1.5em;
`;

const TextContainer = styled.div`
    width: 60%;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        width: 100%;
    }
`;

const ImageOfActvist = styled.img`
    width: 40%;
    height: auto;
    margin: auto 0;
    object-fit: cover;
    object-position: top;
    max-height: 100%;
    border-radius: 0.5em;
    border: black 0.2em solid;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {   
        width: 90%;
    }
`;

function ActvistOfWeek() {
    return (
        <Component>
            <Title>Activist Of The Week</Title>
            <Content>
                <TextContainer>
                    <Name>Greta Thunberg</Name>
                    <ShortDesc>Swedish Climate Change Activist</ShortDesc>
                    <LongDescription>Why does the coupled innocence strike underneath the statistic? How can a blackmail scratch a cluster? How will a virgin storm? The arithmetic bows. The susceptible planet punches the more mate. The formed captain thinks.</LongDescription>
                </TextContainer>
                <ImageOfActvist src = {ActivstPhoto} />
            </Content>
        </Component>
    );
}

export default ActvistOfWeek;
