import React from 'react';
import styled from 'styled-components';

type IconContainerProps = {
    align: boolean,
    selected: boolean
}

const IconContainer = styled.div<IconContainerProps>`
    height: 1.7rem;
    margin: auto;
    padding: 0 0.2rem;
    padding-top: 0.1rem;
    cursor: pointer;
    color: darkgrey;
    &:hover {
        color: rgb(100,100,100)
    }
    ${p => !p.align ? `
    &:active {
        color: rgb(0, 0, 0)
    }
    ` : ''}
    ${p => p.selected ? `
    color: blue;
    background-color: lightblue;
    &:hover {
        color: darkblue
    }
    `
    : ''}
`;

type IconProps = {
    fontSize: string
}

const Icon = styled.h4<IconProps>`
    font-size: ${p => p.fontSize};
    color: inherit;
    margin-top: auto;
    margin-bottom: 0;
    height: fit-content;
    line-height: 1.7rem;
`;

type Props = {
    onClickFunct: any,
    selected: boolean,
    id: number,
    value: number | string,
    icon: any,
    align: boolean,
    fontSize: string
    
}

function ParaInputMenuItem(props: Props) {
    const {selected, value, icon, id, onClickFunct, align, fontSize} = props;
    return (
        <IconContainer align={align} onClick={() => onClickFunct(value, id)} selected={selected}><Icon fontSize = {fontSize}>{icon}</Icon></IconContainer>
    )
}

export default ParaInputMenuItem;