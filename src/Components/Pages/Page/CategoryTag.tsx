import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


const axios = require("axios");

type ContentProps = {
    colour: string
    clickable: boolean,
    disabled: boolean,
    width: string
}

const Content = styled.div<ContentProps>`
    width: ${p => p.width};
    width: 7.1em;
    padding: 0.4em 0;
    height: fit-content;
    margin: 0.5em 0.3em;
    display: flex;
    justify-content: center;
    border-radius: 0.75em;
    background-color: ${p => p.colour};
    cursor: ${p => !p.clickable ? "context-menu" : "pointer"};
    opacity: ${p => p.disabled ? "0.5" : "1"};
`;

const Title = styled.h1`
    color: white;
    font-size: 1em;
    margin: 0;
    cursor: inherit;
`;

type Props = {
    name: string,
    colour: string,
    disabled: boolean,
    clickable: boolean,
    clickFunction: any,
    id: string,
    width: string
}

function CategoryTag(props: Props) {
    return (
        <Content width = {props.width} onClick = {() => {props.clickFunction(props.id)}} clickable = {props.clickable} colour = {props.colour} disabled = {props.disabled}>
            <Title>{props.name}</Title>
        </Content>
    );
}

export default CategoryTag;