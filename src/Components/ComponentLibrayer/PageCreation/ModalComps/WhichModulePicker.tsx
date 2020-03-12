import React from 'react';
import styled from 'styled-components';

type ComponentProps = {
    width: string,
    borderL: boolean,
    borderR: boolean
}
const Component = styled.div<ComponentProps>`
    width: ${p => p.width};
    height: 20em;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border-right: ${p => p.borderR ? "0.5em black solid" : ''};
    border-left: ${p => p.borderL ? "0.5em black solid" : ''};
`;

type ChoiceProps = {
    selected: boolean
}
const Choice = styled.div<ChoiceProps>`
    background-color: #46f646;
    width: 50%;
    height: 2em;
    line-height: 2em;
    font-size: 1.25em;
    text-align: center;
    font-size: 1.5em;
    color: white;
    border-radius: 0.25em;
    cursor: pointer;
    margin: auto 25%;
    opacity: ${p => p.selected ? '1' : '0.5'};
    &:hover {
        background-color: #0bd50b;
    }
`;

type Props = {
    width: string,
    borderR: boolean,
    borderL: boolean,
    textSelected: boolean,
    id: number,
    setTextSelected: any
}

function WhichModulePicker(props: Props) {
    const {borderR, borderL, width, textSelected, id, setTextSelected} = props;
    return (
        <Component borderR = {borderR} borderL = {borderL} width = {width}>
            <Choice onClick = {() => {setTextSelected(id)}} selected = {textSelected}>Text</Choice>
            <Choice onClick = {() => {setTextSelected(id)}} selected = {!textSelected}>Image</Choice>
        </Component>
    )
}

export default WhichModulePicker;