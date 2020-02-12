import React from 'react'
import styled from 'styled-components'

type ComponentProps = {
    margin: string
    width: string
}

const Component = styled.div<ComponentProps>`
    position:  relative;
    width: ${p => p.width};
    height: 100%;
    margin: 1em ${p => p.margin};
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {   
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
    margin: 0;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {   
        padding: 0.25em;
    }
`;

const Para = styled.p`
    width: 100%;
    font-size: 1.5rem;
    font-weight: lighter;
    font-style: normal;
    font-family: 'Cormorant Garamond', serif;
    margin: 0;
`;

const ParaTitle = styled.h1`
    margin: auto 0;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {   
        margin: 0;
        text-align: center;
    }
`;

const CharacterCount = styled.p`
    font-size: 1em;
    margin: auto 0;
    margin-left: auto;
    color: black;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {   
        position: static;
        margin: 0;
    }
`;

const NumberOfCharacter = styled.span`
    color: grey;
`;

const TitleCount = styled.div`
    height: 3em;
    display: flex;    
`;

type Props = {
    paragraphValue: string,
    setParagraphValue: Function,
    editMode: boolean,
    title: string,
    margin: string,
    width: string
}


function ParaInput(props: Props) {
    const { paragraphValue, setParagraphValue, editMode, title, margin} = props;
    return (
        <Component width = {props.width} margin = {margin}>
            <TitleCount>
                <ParaTitle>{title}</ParaTitle>
                {editMode ? <CharacterCount>Number of characters: <NumberOfCharacter>{ paragraphValue != undefined ? paragraphValue.length : '0'}</NumberOfCharacter></CharacterCount> : ''}
            </TitleCount>
            {paragraphValue == undefined && !editMode ? "Click the edit button to fill me in!" : ""}
            {editMode ? <ParaInputStyle value={paragraphValue} onChange={(e) => { setParagraphValue(e.target.value) }} /> : <Para>{paragraphValue}</Para>}
        </Component>
    )
}

export default ParaInput;