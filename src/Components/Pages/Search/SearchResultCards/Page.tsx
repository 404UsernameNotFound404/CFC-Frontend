import React, { useState }from 'react';
import styled from 'styled-components';
import BasicButton from '../../../ComponentLibrayer/BasicButton';
import { Link } from 'react-router-dom';
import PageCategories from '../../Page/PageCategories';

type ContainerProps = {
    width: string
}

const Container = styled.div<ContainerProps>`
    border: black 0.2rem solid;
    width: ${p => p.width};
    margin: 1.5%;
    border-radius: 1em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        border-width: 1%;
        width: 98%;
        margin: 1.5em 0;
        padding: 0;
        height: fit-content;
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
    object-fit: cover;
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
    para: string,
    ID: string,
    Categories: {Name: string, ID: string, Colour: string}[],
    image: string,
    width: string
}

function Page(props: Props) {
    const [buttonState, setButtonState] = useState(false);

    const buttonClicked = () => {
        if(buttonState) setButtonState(false)
        else setButtonState(true)
    }

    return (
        <Container width = {props.width}>
            {}
            <PortraitOfActivist src={props.image} />
            <Name>{props.name}</Name>
            <ElevatorPitch>
                {props.para.substring(0,80)}...
            </ElevatorPitch>
            <Link to =  {`/page?id=${props.ID}`}><BasicButton width = {"50%"} activateButton = {buttonClicked} text={"See More"} active={buttonState} id={20} /></Link>
            <div style = {{marginLeft: "1em"}}>
                <PageCategories allCategories = {[]} setAllCategories = {null} editMode = {false} categories = {props.Categories} width = {"100%"} />
            </div>
        </Container>
    );
}

export default Page;
