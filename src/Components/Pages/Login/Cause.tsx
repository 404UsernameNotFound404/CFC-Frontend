import React, { useState } from 'react';
import styled from 'styled-components';

type ContentStyle = {
    active: boolean,
    backgroundColor: string,
    backgroundColorAct: string
}

const Content = styled.div<ContentStyle>`
    width: 100%;
    height: 4em;
    background-color: ${p => p.active ? p.backgroundColorAct : p.backgroundColor}
`;

const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    margin: auto;
`;

type Props = {
    title: string;
    active: boolean;
    backgroundColor: string;
    backgroundColorAct: string;
}

function Cause(props: Props) {
    return (
        <Content active = {props.active} backgroundColor = {props.backgroundColor} backgroundColorAct = {props.backgroundColorAct}>
           <Title>{props.title}</Title>
        </Content>
    );
}

export default Cause;
