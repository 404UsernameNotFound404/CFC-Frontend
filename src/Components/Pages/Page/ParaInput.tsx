import React from 'react'
import styled from 'styled-components'

const Component = styled.div`
    position:  relative;
    width: 80%;
    height: 100%;
    margin: auto;
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
`;

const Para = styled.p`
    width: 100%;
    font-size: 1.5rem;
    font-weight: lighter;
    font-style: normal;
    font-family: 'Cormorant Garamond', serif;
`;

const ParaTitle = styled.h1``;

const CharacterCount = styled.p`
    font-size: 1em;
    position: absolute;
    right: 0;
    top: 0;
    color: black;
`;

const NumberOfCharacter = styled.span`
    color: grey;
`;

type Props = {
    paragraphValue: string,
    setParagraphValue: Function,
    editMode: boolean,
    title: string
}


function ParaInput(props: Props) {
    const { paragraphValue, setParagraphValue, editMode, title} = props;
    return (
        <Component>
            <CharacterCount>Number of characters: <NumberOfCharacter>{ paragraphValue != undefined ? paragraphValue.length : '0'}</NumberOfCharacter></CharacterCount>
            <ParaTitle>{title}</ParaTitle>
            {paragraphValue == undefined && !editMode ? "Click the edit button to fill me in!" : ""}
            {editMode ? <ParaInputStyle value={paragraphValue} onChange={(e) => { setParagraphValue(e.target.value) }} /> : <Para>{paragraphValue}</Para>}
        </Component>
    )
}

export default ParaInput;