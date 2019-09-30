import React from 'react';
import styled from 'styled-components';
import checkMark from '../../../img/checkmark.svg';

type ContentStyle = {
    active: boolean,
    backgroundColor: string,
    backgroundColorAct: string
}

const Content = styled.div<ContentStyle>`
    width: 12em;
    height: 2.5em;
    margin: 0.5em 0;
    margin-right: 1em;
    /* background-color: ${p => p.active ? p.backgroundColorAct : p.backgroundColor}; */
    border-radius: 0.5em;
    cursor: pointer;
    display: flex;
    border: 0.15em ${p => p.active ? p.backgroundColorAct : p.backgroundColor} solid;
    :hover {
        border-color: black;
    }
`;

type TitleStyle = {
    active: boolean;
    backgroundColor: string;
    backgroundColorAct: string;
}

const Title = styled.h1<TitleStyle>`
    font-size: 1.25em;
    text-align: left;
    display: block;
    margin: auto 0;
    margin-right: 0.5em;
    color: ${p => p.active ? p.backgroundColorAct : p.backgroundColor};
    font-family: "Times New Roman", Times, serif;
`;

type CheckBoxStyle = {
    active: boolean;
    backgroundColor: string;
}

const CheckBox = styled.div<CheckBoxStyle>`
    border-radius: 0.25em;
    border: thin solid black;
    width: 1em;
    height: 1em;
    margin: auto 0;
    margin-left: 0.5em;
    margin-right: auto;  
    display: flex;
    justify-content: center;
    background-color: ${p => p.active ? p.backgroundColor : 'transparent'}
`;

const CheckMark = styled.img`
    width: 75%;
    height: 75%;
    margin: auto;
    display: block;
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
            <CheckBox active = {props.active} backgroundColor = {props.backgroundColor}>
                {props.active ? <CheckMark src = {checkMark} /> : ""}
            </CheckBox>
           <Title active = {props.active} backgroundColor = {props.backgroundColor} backgroundColorAct = {props.backgroundColorAct}>{props.title}</Title>
        </Content>
    );
}

export default Cause;
