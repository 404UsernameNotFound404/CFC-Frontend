import React, { useState }from 'react';
import styled from 'styled-components';
import BasicButton from '../../ComponentLibrayer/BasicButton';
import { Link } from 'react-router-dom';

const Container = styled.div`
    border: black 0.2rem solid;
    padding: 1em 0;
    width: 30%;
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
    width: 90%;
    margin: 1em auto;
    /* text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden; */
`;

type Props = {
    name: string,
    img: string,
    para: string,
    ID: string
}

function Page(props: Props) {
    const [buttonState, setButtonState] = useState(false);

    const buttonClicked = () => {
        if(buttonState) setButtonState(false)
        else setButtonState(true)
    }

    return (
        <Container>
            <PortraitOfActivist src={props.img} />
            <Name>{props.name}</Name>
            <ElevatorPitch>
                {props.para.substring(0,80)}...
            </ElevatorPitch>
            <Link to =  {`/page?id=${props.ID}`}><BasicButton width = {"50%"} activateButton = {buttonClicked} text={"See More"} active={buttonState} id={20} /></Link>
        </Container>
    );
}

export default Page;
