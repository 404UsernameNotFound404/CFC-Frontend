import React from 'react';
import styled from 'styled-components';

type ContentStyle = {
    active: boolean,
    backgroundColor: string,
    backgroundColorAct: string
}

const Content = styled.div<ContentStyle>`
    width: 9.1em;
    padding: 0.15em;
    height: 4em;
    margin: 0.5em 0;
    background-color: ${p => p.active ? p.backgroundColorAct : p.backgroundColor};
    border-radius: 0.5em;
    display: flex;
    justify-content: center;
    cursor: pointer;
    border: none;
    :hover {
        border: 0.15em black solid;
        padding: 0;
    }
`;

const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    margin: auto;
    color: white;
    font-family: "Times New Roman", Times, serif;
`;

type Props = {
    title: string;
    active: boolean;
    backgroundColor: string;
    backgroundColorAct: string;
    causeClicked: Function;
    id: number;
}

function Cause(props: Props) {

    const onClick = () => {
        props.causeClicked(props.id);
    }

    return (
        <Content onClick = {onClick} active = {props.active} backgroundColor = {props.backgroundColor} backgroundColorAct = {props.backgroundColorAct}>
           <Title>{props.title}</Title>
        </Content>
    );
}

export default Cause;
