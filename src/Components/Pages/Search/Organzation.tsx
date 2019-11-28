import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    border: black 0.2rem solid;
    width: 30%;
    padding: 1%;
    margin: 1.5%;
    border-radius: 1em;
    @media (max-width: 768px) { 
        border-width: 1%;
        width: 98%;
        margin: 1.5em 0;
        padding: 0;
    }
`;

const Name = styled.h1`
    font-size: 1.75em;
    margin: 0.1em 0;
`;

const LogoOfOrg = styled.img`
    position: absolute;
    border: black thin solid;
    border-radius: 0.1em;
    width: 3em;
    height: 3em;
    margin: 1em auto;
    display: block;
    top: 0;
    right: 1em;
`;

const Location = styled.h1`
    font-size: 1.25em;
    width: 90%;
    margin: 0;
    font-weight: 400;
`;

const Desc = styled.h1`
    font-size: 1em;
    width: 90%;
    margin: 1em 0;
    margin-bottom: 0.1em;
`;

const LinkToWebite = styled.a`
    text-decoration: none;
`;

type Props = {
    name: string,
    img: string,
    desc: string,
    link: string,
    location: string,
    interests: {Name: string, Colour: string}
}

function Organzation(props: Props) {
    return (
        <Container>
            <Name>{props.name}</Name>
            <Location>{props.location}</Location>
            <Desc>{props.desc}</Desc>
            <LinkToWebite href = {props.link}>{props.name}</LinkToWebite>
            <LogoOfOrg src = {props.img} />
        </Container>
    );
}

export default Organzation;