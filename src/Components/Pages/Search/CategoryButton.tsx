import React from 'react';
import styled from 'styled-components';

type ContainerStyleProps = {
    colour: string,
    active: boolean
}

const Container = styled.div<ContainerStyleProps>`
    /* flex: 1; */
    cursor: pointer;
    background-color: ${p => p.colour};
    border-radius: 0.5em;
    width: 21%;
    padding: 1.5em 1%;
    margin: 1em auto;
    text-align: center;
    color: black !important;
    
    opacity: ${p => p.active ? '1' : '0.5'};
    @media (max-width: 768px) { 
        padding: 1em 1%;
        width: 8em;
    }
    display: flex;
    justify-content: center;
    &:hover {
        border-color: transparent;
        color: white;
    }
`;

const Text = styled.h1`
    font-size: 1.5em;
    text-align: center;
    margin: auto;
    @media (max-width: 768px) { 
        font-size: 1.25em;
    }
`;

type Props = {
    text: string,
    colour: string,
    active: boolean,
    id: number,
    activateButton: Function
}

function CategoryButton(props: Props) {
    return (
        <Container active={props.active} colour={props.colour} onClick={() => { props.activateButton(props.id) }}><Text>{props.text}</Text></Container>
    );
}

export default CategoryButton;
