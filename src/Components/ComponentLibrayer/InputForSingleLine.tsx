import React from 'react';
import styled from 'styled-components';

const Component = styled.div`
    width: 100%;
`;

const InputComponent = styled.input`
    display: inline-block;
    border: none;
    width: 100%;
    &:focus {
        outline: none;
    }
    @media (max-width: 768px) {  
        font-size: 1.1em;
        margin: 0.2em 0;
    }
`;

const Title = styled.h1`
    font-size: 1.25em;
    margin: 0.25em 0;
    @media (max-width: 768px) {  
        font-size: 1.5em;
        margin: 0;    
    }
`;

type Props = {
    value: string,
    update: any,
    id: number,
    title: string
}

function InputForSingleLine(props: Props) {
    return (
        <Component>
            <Title>{props.title}:</Title>
            <InputComponent value={props.value} onChange={(e) => { props.update(props.id, e.target.value) }} />
        </Component>
    );
}

export default InputForSingleLine;
