import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import autoSize from 'autosize';
import ParaInputMenu from './ParaInputMenu';

type ComponentProps = {
    margin: string
    width: string,
    fontSize: number,
    minHeight: string,
    height: string
}

const Component = styled.div<ComponentProps>`
    min-height: ${p => p.minHeight};
    position:  relative;
    width: ${p => p.width};
    min-height: 10em;
    height: ${p => p.height};
    margin: ${p => p.margin};
    font-size: ${p => p.fontSize}rem;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {   
        width: 90%;
    }
`;

type ParaInputStyleProps = {
    textAlign: string,
    showBorderBottom: boolean,
    pageCreation: boolean,
    editMode: boolean
}

const ParaInputStyle = styled.textarea<ParaInputStyleProps>`
    width: 100%;
    resize: none;
    font-size: inherit;
    overflow: none;
    border: none;
    border-bottom: ${p => p.showBorderBottom ? "grey thin solid" : ''};
    border: ${p => !(p.pageCreation || !p.editMode) ? "thin grey solid" : 'none'};
    padding: ${p => !p.pageCreation ? "0.25rem" : ''};
    font-family: 'Cormorant Garamond', serif;
    font-style: normal;
    text-align: ${p => p.textAlign};
    overflow: auto;
    margin: 0;
    min-height: 5em;
    height: ${p => !p.pageCreation ? "50%" : 'auto'};
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {   
        padding: 0.25rem;
    }
`;

type ParaProps = {
    textAlign: string
}

const ParaTitle = styled.h1`
    margin: auto 0;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {   
        font-size: 1em;
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
    height?: string
}


function ParaInput(props: Props) {
    const ref = useRef(null);
    const menuRef = useRef(null);
    const { paragraphValue, setParagraphValue, editMode, title, margin, pageCreation } = props;
    const [fontSize, setFontSize] = useState((props.fontSize) ? props.fontSize : 1.25);
    const [focus, setFocus] = useState(false);
    const textAlign = (props.textAlign) ? props.textAlign : 'left';
    const height = (props.height) ? props.height : '100%';
    
    useEffect(() => {
        if (pageCreation) {
            document.addEventListener('click', checkFocus);
            ref.current.focus();
            autoSize(ref.current);
        }
    }, [])

    useEffect(() => {
        if (pageCreation) {
            setFontSize(props.fontSize)
        }
    }, [props.fontSize])

    const checkFocus = (e: any) => {
        let found = false;
        let parent = e.target;
        do {
            parent = parent.parentElement;
            if (parent == ref.current || parent == menuRef.current) {
                found = true;
            }
        } while (parent != null);
        if (e.target != ref.current && !found) {
            setFocus(false);
        }
    }

    const updateText = (e: any) => {
        console.log("hello")
        if (pageCreation) {
            ref.current.focus();
            autoSize(ref.current);
            setParagraphValue(props.id, e.target.value, 0);
        }
        else setParagraphValue(e.target.value)
    }

    const switchOrientation = (value: string) => {
        setParagraphValue(props.id, value, 1);
    }

    const increaseDecreaseFont = (value: number) => {
        setParagraphValue(props.id, value, 2);
        ref.current.focus();
        autoSize(ref.current);
    }

    const calcMinHeight = (): string => {
        if (pageCreation && editMode) return "9rem"
        if (!pageCreation && editMode) return "2rem"
        return "0"
    }

    return (
        <Component height = {height} minHeight={(editMode ? calcMinHeight() : "0")} onClick={() => setFocus(true)} fontSize={fontSize} width={props.width} margin={margin}>
            <ParaInputMenu show={(focus && pageCreation && editMode)} increaseDecreaseFont={increaseDecreaseFont} menuRef={menuRef} switchOrientation={switchOrientation} setFocus={setFocus} />
            {!pageCreation ? <TitleCount>
                <ParaTitle>{title}</ParaTitle>
                {editMode ? <CharacterCount>Number of characters: <NumberOfCharacter>{paragraphValue != undefined ? paragraphValue.length : '0'}</NumberOfCharacter></CharacterCount> : ''}
            </TitleCount> : ''}
            {paragraphValue == undefined && !editMode ? "Click the edit button to fill me in!" : ""}
            <ParaInputStyle editMode = {editMode} pageCreation={pageCreation} showBorderBottom={paragraphValue != undefined && paragraphValue.length == 0 && !pageCreation} rows={1} ref={ref} textAlign={textAlign} value={paragraphValue} onChange={updateText} readOnly={!editMode} />
        </Component>
    )
}

export default ParaInput;