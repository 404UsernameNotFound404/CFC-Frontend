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
    padding: 1em 1%;
    margin: 1em auto;
    text-align: center;
    color: black !important;
    font-size: 1.5em;
    opacity: ${p => p.active ? '1' : '0.5'};
    &:hover {
        border-color: transparent;
        color: white;
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
        <Container active={props.active} colour={props.colour} onClick={() => { props.activateButton(props.id) }}>{props.text}</Container>
    );
}

export default CategoryButton;
