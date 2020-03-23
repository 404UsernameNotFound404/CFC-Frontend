import React, { useEffect } from 'react';
import styled from 'styled-components';
import BlogRantPhoto from '../../../img/greta.jpg'

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

const ImageOfActivist = styled.img`
    width: 38%;
    height: 100%;
    margin: auto 0;
    margin-left: 0.5em;
    object-fit: cover;
    object-position: top;
    max-height: 100%;
    border-radius: 0.5em;
    border: black 0.2em solid;
    background-color: black;
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
                    <Name>Blogs And Rants</Name>
                    <ShortDesc>Introductory</ShortDesc>
                    <LongDescription>
                        This is where we will put a blog we would like to feature. We have not decided how we would like the blog to
                        work, and would love your feedback on how you would like it to look. And what you would like to be possible.
                    </LongDescription>
                </TextContainer>
                <ImageOfActivist />
            </Content>
        </Component>
    );
}

export default ActvistOfWeek;
