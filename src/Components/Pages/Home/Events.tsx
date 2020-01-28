import React, { useEffect } from 'react';
import styled from 'styled-components';
import climateMarch from '../../../img/climateMarch.jpg'
import { useMediaQuery } from 'react-responsive'

const Content = styled.div`
    width: 47%;
    margin-left: 3%;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {    
        width: 50%;
    }
`;

const Title = styled.h1`
    font-size: 3em;
    text-align: center;
    text-decoration: underline;
    margin-bottom: 0.3em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {   
        font-size: 3em;
    }
`;

const NameOfEvent = styled.h3`
    font-size: 2.5em;
    text-align: center;
    margin: 0;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {   
        font-size: 2em;
        margin-bottom: 0.5em;
    }
`;

const TimeAndLocation = styled.h4`
    font-size: 1.5rem;
    margin: 0;
`;

const TimeAndLocationContent = styled.span`
    font-size: 1.3rem;
    color: #404040;
`;

const Photo = styled.img`
    width: 100%;
    height: 15em;
    object-fit: cover;
    object-position: mid;
    border-radius: 0.5em;
    border: black 0.2em solid;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {    
        margin-top: 2em;
    }
`;

const Description = styled.p`
    font-family: "Times New Roman", Times, serif;
    font-size: 1.25em;
    margin: 0;
`;

function Events() {
    const phone = useMediaQuery({ query: `(max-width: ${process.env.REACT_APP_PHONE_BREAK}px)` })

    return (
        <Content>
            <Title>Event</Title>
            <NameOfEvent>The March For Climate</NameOfEvent>
            {!phone ? <Photo src = {climateMarch} /> : ""}
            <TimeAndLocation>Time: <TimeAndLocationContent>Wednesday 32nd of December</TimeAndLocationContent></TimeAndLocation>
            <TimeAndLocation>Location: <TimeAndLocationContent>Parliament Hill</TimeAndLocationContent></TimeAndLocation>
            <Description>Filler text. Filler text. Filler text. Filler text. Filler text. Filler text. Filler text. Filler text.?</Description>
            {phone ? <Photo src = {climateMarch} /> : ""}
        </Content>
    );
}

export default Events;
