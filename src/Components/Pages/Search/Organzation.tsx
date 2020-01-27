import React, { useState } from 'react';
import styled from 'styled-components';
import PageCategories from '../Page/PageCategories';

const Container = styled.div`
    position: relative;
    border: black 0.2rem solid;
    background-color: #f9f9f9;
    width: 27%;
    padding: 2%;
    margin: 0.5%;
    border-radius: 1em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        border-width: 1%;
        width: 90%;
        margin: 1.5em 0;
    }
    transition: all 1s;
`;

const Name = styled.h1`
    font-size: 1.75em;
    margin: 0.1em 0;
    width: 60%;
    height: 4em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
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
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 5em;
        height: 5em;
    }
`;

const Location = styled.h1`
    font-size: 1.25em;
    height: 1.5em;
    width: 90%;
    margin: 0;
    font-weight: 400;
`;

const Desc = styled.p`
    font-size: 1em;
    width: 90%;
    margin: 1em 0;
    margin-bottom: 0.1em;
    transition: all 1s;
`;

const SeeMore = styled.h4`
    color: #007aa2;
    font-size: 1em;
    margin: 0;
    width: fit-content;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const LinkToWebite = styled.a`
    font-size: 1.25em;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const Email = styled.h4`
    font-size: 1.25em;
    margin: 0;
`;

type Props = {
    name: string,
    desc: string,
    link: string,
    location: string,
    interests: {Name: string, Colour: string, ID: string}[],
    image: string,
    email: string
}

function Organzation(props: Props) {
    const [seeMore, setSeeMore] = useState(false);
    return (
        <Container>
            <Name>{props.name.length >= 30 ? (props.name.substring(0, 30) + "...") : props.name}</Name>
            <Location>{props.location.length >= 30 ? (props.location.substring(0, 30) + "...") : props.location}</Location>
            <Desc>{props.desc.length >= 100 && !seeMore ? (props.desc.substring(0, 100) + "...") : props.desc}</Desc>
            {props.desc.length >= 100 ? <SeeMore onClick = {() => {setSeeMore(!seeMore)}}>See More</SeeMore> : <div style = {{height: '1.3em'}}></div>}
            <LinkToWebite href = {props.link}>{props.link.length >= 35 ? (props.link.substring(0, 35) + "...") : props.link}</LinkToWebite>
            <Email>{props.email}</Email>
            <LogoOfOrg src = {props.image} />
            <PageCategories editMode = {false} categories = {props.interests} allCategories = {[]} setAllCategories = {[]} width = {"100%"} />
        </Container>
    );
}

export default Organzation;
