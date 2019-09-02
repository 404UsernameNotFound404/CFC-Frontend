import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    border: black 0.2rem solid;
    padding: 1em 0;
    width: 30%;
    margin: 1.5%;
    border-radius: 1em;
`;

const Name = styled.h1`
    font-size: 1.5em;
    text-align: center;
    margin: 0 .5em;
`;

const PortraitOfActivist = styled.img`
    border: black thick solid;
    border-radius: 50%;
    width: 12em;
    height: 12em;
    margin: 1em auto;
    display: block;
`;

const Cause = styled.h1`
    font-size: 1.25em;
    text-align: center;
    width: 90%;
    margin: 0 auto;
    font-weight: 400;
`;

const WhereTheyAreBased = styled.h1`
    font-size: 1.25em;
    text-align: center;
    width: 90%;
    margin: 0 auto;
    font-weight: 400;
`;

const ElevatorPitch = styled.h1`
    font-size: 1em;
    text-align: center;
    width: 95%;
    margin: 1em auto;
`;

const SeeMoreButton = styled.div`
    cursor: pointer;
    border: navy 0.1em solid;
    border-radius: 0.5em;
    width: 50%;
    padding: 0.25em 1em;
    margin: 1em auto;
    text-align: center;
    color: navy;
    font-size: 1.5em;
    &:hover {
        background-color: rgba(0, 43, 128, 0.2);
    }
`;

type Props = {
    name: string,
    img: string,
    para: string
}

function Activst(props: Props) {
    return (
        <Container>
            <PortraitOfActivist src={props.img} />
            <Name>{props.name}</Name>
            <Cause>Indegnous Stuff, Envorment Stuff</Cause>
            <WhereTheyAreBased>Ottawa, Ontario, Canada</WhereTheyAreBased>
            <ElevatorPitch>
                I am Daxton Rhead, I am a poopy pants. I need more text
                so I am writing more, this is probably goood.
            </ElevatorPitch>
            <SeeMoreButton>See More</SeeMoreButton>
        </Container>
    );
}

export default Activst;
