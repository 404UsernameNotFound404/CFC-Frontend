import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import autoSize from 'autosize';
import ParaInputMenu from './ParaInputMenu';

type ComponentProps = {
    margin: string
    width: string,
    fontSize: number
}

const Component = styled.div<ComponentProps>`
    position:  relative;
    width: ${p => p.width};
    height: 100%;
    margin: ${p => p.margin};
    font-size: ${p => p.fontSize}rem;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {   
        width: 95%;
    }
`;

type ParaInputStyleProps = {
    textAlign: string
}

const ParaInputStyle = styled.textarea<ParaInputStyleProps>`
    width: 100%;
    min-height: 2em;
    height: auto;
    resize: none;
    font-size: inherit;
    overflow: none;
    border: lightgrey solid thin;
    font-family: 'Cormorant Garamond', serif;
    font-style: normal;
    text-align: ${p => p.textAlign};
    overflow: auto;
    padding: 0.25em;
    margin: 0;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {   
        padding: 0.25em;
    }
`;

type ParaProps = {
    textAlign: string
}


const Para = styled.p<ParaProps>`
    width: 100%;
    font-size: inherit;
    font-weight: lighter;
    font-style: normal;
    text-align: ${p => p.textAlign};
    font-family: 'Cormorant Garamond', serif;
    margin: 0;
    padding: 0.25em;
`;

const ParaTitle = styled.h1`
    margin: auto 0;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {   
        font-size: 1.5em;
        margin: auto;
        text-align: center;
    }
`;

const CharacterCount = styled.p`
    font-size: 0.9em;
    margin: 0;
    margin-top: auto;
    margin-bottom: 0.5em;
    margin-left: auto;
    color: black;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {   
        position: static;
        margin: auto;
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
    width: string,
    pageCreation?: boolean,
    id?: any,
    textAlign?: string,
    fontSize?: number,
}


function ParaInput(props: Props) {
    const ref = useRef(null);
    const menuRef = useRef(null);
    const { paragraphValue, setParagraphValue, editMode, title, margin, pageCreation } = props;
    const [fontSize, setFontSize] = useState((props.fontSize) ? props.fontSize  : 1.5);
    const [focus, setFocus] = useState(false);
    const forceUpdate = useForceUpdate();
    const [clickedMenu, setClickedMenu] = useState(false);
    const textAlign = (props.textAlign) ? props.textAlign : 'left';
    useEffect(() => {
        document.addEventListener('click', checkFocus);
    }, [])

    useEffect(() => {
        setFontSize(props.fontSize)
    }, [props.fontSize])

    const checkFocus = (e: any) => {
        let found = false;
        let parent = e.target;
        do {
            parent = parent.parentElement;
            if (parent == ref.current || parent == menuRef.current) {
                found = true;
            }
        } while(parent != null);
        if (e.target != ref.current && !found) {
            setFocus(false);
        }
        setClickedMenu(true);
    }

    const updateText = (e: any) => {
        ref.current.focus();
        autoSize(ref.current);
        setParagraphValue(props.id, e.target.value, 0);
    }

    const switchOrientation = (value: string) => {
        setParagraphValue(props.id, value, 1);
    }

    const increaseDecreaseFont = (value: number) => {
        setParagraphValue(props.id, value, 2);
    }

    return (
        <Component onClick={() => setFocus(true)} fontSize={fontSize} width={props.width} margin={margin}>
            {focus && pageCreation ? <ParaInputMenu increaseDecreaseFont = {increaseDecreaseFont} menuRef = {menuRef} switchOrientation={switchOrientation} setFocus={setFocus} /> : ""}
            {!pageCreation ? <TitleCount>
                <ParaTitle>{title}</ParaTitle>
                {editMode ? <CharacterCount>Number of characters: <NumberOfCharacter>{paragraphValue != undefined ? paragraphValue.length : '0'}</NumberOfCharacter></CharacterCount> : ''}
            </TitleCount> : ''}
            {paragraphValue == undefined && !editMode ? "Click the edit button to fill me in!" : ""}
            {editMode ? <ParaInputStyle rows={1} ref={ref} textAlign={textAlign} value={paragraphValue} onChange={updateText} /> : <Para textAlign={textAlign}>{paragraphValue}</Para>}
        </Component>
    )
}

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

export default ParaInput;