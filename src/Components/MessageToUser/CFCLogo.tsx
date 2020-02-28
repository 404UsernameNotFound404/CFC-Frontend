import React from 'react';
import styled from 'styled-components';

const Component = styled.div`
    width: 7em;
    height: 7em;
    background-color: #3c78d8;
    border-radius: 50%;
    position: relative;
    z-index: 100;
`;

const FirstC = styled.h1`
    position: absolute;
    top: 0.25em;
    left: 0.4em;
    color: white;
    font-size: 2.5em;
    margin: 0;
`;

const F = styled.h1`
    position: absolute;
    top: 0.8em;
    left: 1.2em;
    color: white;
    font-size: 2.5em;
    margin: 0;
`;

const SecondC = styled.h1`
    position: absolute;
    top: 1.25em;
    left: 1.75em;
    color: white;
    font-size: 2.5em;
    margin: 0;
`;



function CFCLogo() {
    return (
        <Component>
            <FirstC>C</FirstC>
            <F>F</F>
            <SecondC>C</SecondC>
        </Component>
    )
}

export default CFCLogo;