import React from 'react';
import styled from 'styled-components';

type ContainerStyleProps = {
    highLightColor: string,
    normalColor: string,
    active: boolean,
    width: string
}

const Container = styled.div<ContainerStyleProps>`
    /* flex: 1; */
    cursor: pointer;
    background-color: ${p => p.active ? p.highLightColor : p.normalColor};
    border-radius: 0.2em;
    width: ${p => p.width};
    padding: 0.25em 0;
    margin: 1em auto;
    text-align: center;
    color: ${p => p.active ? 'white' : 'black'};
    font-size: 1.5em;
    &:hover {
        border-color: transparent;
        color: white;
    }
`;

type Props = {
    text: string,
    active: boolean,
    id: number,
    activateButton: Function,
    width: string
}

function BasicButton(props: Props) {
    const normalColor = '#a4c2f4';
    const highLightColor = '#3c78d8';
    return (
        <Container width = {props.width} active={props.active} normalColor={normalColor} highLightColor={highLightColor} onClick={() => { props.activateButton(props.id) }}>{props.text}</Container>
    );
}

export default BasicButton;
