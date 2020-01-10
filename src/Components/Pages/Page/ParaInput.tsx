import React from 'react'
import styled from 'styled-components'

type Component = {
    margin: string
}
const Component = styled.div<Component>`
    position:  relative;
    width: 80%;
    height: 100%;
    margin: ${p => p.margin};
    @media (max-width: 768px) {   
        width: 95%;
    }
`;

const ParaInputStyle = styled.textarea`
    width: 100%;
    height: 10em;
    resize: none;
    overflow: none;
    border: lightgrey solid thin;
    font-size: 1.5rem;
    font-family: 'Cormorant Garamond', serif;
    font-style: normal;
    text-align: center;
    @media (max-width: 768px) {   
        padding: 0.25em;
    }
`;

const Para = styled.p`
    width: 100%;
    font-size: 1.5rem;
    font-weight: lighter;
    font-style: normal;
    font-family: 'Cormorant Garamond', serif;
`;

const ParaTitle = styled.h1`
    @media (max-width: 768px) {   
        margin: 0;
    }
`;

const CharacterCount = styled.p`
    font-size: 1em;
    position: absolute;
    right: 0;
    top: 0;
    color: black;
    @media (max-width: 768px) {   
        position: static;
        margin: 0;
    }
`;

const NumberOfCharacter = styled.span`
    color: grey;
`;

type Props = {
    paragraphValue: string,
    setParagraphValue: Function,
    editMode: boolean,
    title: string,
    margin: string
}


function ParaInput(props: Props) {
    const { paragraphValue, setParagraphValue, editMode, title, margin} = props;
    return (
        <Component margin = {margin}>
            <ParaTitle>{title}</ParaTitle>
            {editMode ? <CharacterCount>Number of characters: <NumberOfCharacter>{ paragraphValue != undefined ? paragraphValue.length : '0'}</NumberOfCharacter></CharacterCount> : ''}
            {paragraphValue == undefined && !editMode ? "Click the edit button to fill me in!" : ""}
            {editMode ? <ParaInputStyle value={paragraphValue} onChange={(e) => { setParagraphValue(e.target.value) }} /> : <Para>{paragraphValue}</Para>}
        </Component>
    )
}

export default ParaInput;