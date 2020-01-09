import React from 'react';
import styled from 'styled-components';
import PageCategories from '../Page/PageCategories';

const Container = styled.div`
    position: relative;
    border: black 0.2rem solid;
    background-color: #f9f9f9;
    width: 30%;
    padding: 2%;
    margin: 1.5%;
    border-radius: 1em;
    @media (max-width: 768px) { 
        border-width: 1%;
        width: 90%;
        margin: 1.5em 0;
    }
`;

const Name = styled.h1`
    font-size: 1.75em;
    margin: 0.1em 0;
    max-width: 75%;
    @media (max-width: 768px) { 
        font-size: 1.5em;
    }
`;

const LogoOfOrg = styled.img`
    position: absolute;
    border: black thin solid;
    border-radius: 0.1em;
    width: 7em;
    height: 7em;
    margin: 1em auto;
    display: block;
    top: 0;
    right: 1em;
    object-fit: cover;
    @media (max-width: 768px) { 
        width: 5em;
        height: 5em;
    }
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
    desc: string,
    link: string,
    location: string,
    interests: {Name: string, Colour: string, ID: string}[],
    image: string
}

function Organzation(props: Props) {
    return (
        <Container>
            <Name>{props.name}</Name>
            <Location>{props.location}</Location>
            <Desc>{props.desc}</Desc>
            <LinkToWebite href = {props.link}>{props.name}</LinkToWebite>
            <LogoOfOrg src = {props.image} />
            <PageCategories editMode = {false} categories = {props.interests} allCategories = {[]} setAllCategories = {[]} width = {"100%"} />
        </Container>
    );
}

export default Organzation;
