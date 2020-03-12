import React from 'react';
import styled from 'styled-components';

type IconContainerProps = {
    align: boolean,
    selected: boolean
}

const IconContainer = styled.div<IconContainerProps>`
    height: 100%;
    margin: auto;
    padding: 0 0.2rem;
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

const Icon = styled.h4`
    font-size: 1.5rem;
    color: inherit;
    margin: auto;
`;

type Props = {
    onClickFunct: any,
    selected: boolean,
    id: number,
    value: number | string,
    icon: any,
    align: boolean
    
}

function ParaInputMenuItem(props: Props) {
    const {selected, value, icon, id, onClickFunct, align} = props;
    return (
        <IconContainer align={align} onClick={() => onClickFunct(value, id)} selected={selected}><Icon>{icon}</Icon></IconContainer>
    )
}

export default ParaInputMenuItem;