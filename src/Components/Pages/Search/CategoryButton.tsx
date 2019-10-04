import React from 'react';
import styled from 'styled-components';

type ContainerStyleProps = {
    highLightColor: string,
    normalColor: string,
    active: boolean
}

const Container = styled.div<ContainerStyleProps>`
    /* flex: 1; */
    cursor: pointer;
    background-color: ${p => p.active ? p.highLightColor : p.normalColor};
    border-radius: 0.5em;
    width: 22.5%;
    padding: 0.25em 0;
    margin: 1em auto;
    text-align: center;
    color: black !important;
    font-size: 1.5em;
    &:hover {
        border-color: transparent;
        color: white;
    }
`;

type Props = {
    text: string,
    normalColor: string,
    highLightColor: string,
    active: boolean,
    id: number,
    activateButton: Function
}

function CategoryButton(props: Props) {
    return (
        <Container active={props.active} normalColor={props.normalColor} highLightColor={props.highLightColor} onClick={() => { props.activateButton(props.id) }}>{props.text}</Container>
    );
}

export default CategoryButton;
