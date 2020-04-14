import React, { useState } from 'react';
import styled from 'styled-components';

const Email = styled.textarea`
    font-size: 1.25em;
    margin: 0;
    background-color: none !important; 
    border: none;
    font-family: 'Cormorant Garamond', serif;
    width: 100%;
    height: 1.5em;
    resize: none;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: transparent;
`;

const CopyEmail = styled.div`
    margin: 0.5em 0;
    width: 6em;
    text-align: center;
    padding: 0.em 0;
    background-color: lightgray;
    border: solid thin darkgrey;
    cursor: pointer;
    user-select: none;
    &:hover {
        background-color: #b2b2b2;
    }
    &:active {
        background-color: gray;
    }
`;

const GhostToFocus = styled.textarea`
    position: absolute;
    left: -90000px;
`;

const CopyButtonContainer = styled.div`
    display: flex;
`;

type CopyMessageProps = {
    color: string
}

const CopyMessage = styled.h4<CopyMessageProps>`
    margin: auto 0;
    margin-left: 0.5em;
    font-size: 1.1em;
    color: ${p => p.color};
    transition: all 0.5s ease;
    opacity: 0;
`;

type Props = {
    email: string
}

function EmailCopy(props: Props) {
    const [seeMore, setSeeMore] = useState(false);
    const [textToCopy, setTextToCopy] = useState(null);
    const [ghostText, setGhostText] = useState(null);
    const [copyMessageRef, setCopyMessageRed] = useState(null);
    const [copyMessage, setCopyMessage] = useState({message: '', color: 'red'})
    const specificID = "super-long-never-going-to-be-the-same-as-someone-else-1234-asd-123-asdcvxvxgfdg-5940" + props.email;

    const copyEmail = async (e: any) => {
        //selecting email ele
        if (textToCopy != null && textToCopy.select != null) textToCopy.select();
        await document.execCommand('copy');
        //selecting a div way outside of view so the email is not visually every highlighted
        ghostText.select();
        setCopyMessage({message: "Copied Email", color: "black"})
        //animation for copied message
        copyMessageRef.style.opacity = '1';
        setTimeout(() => {
            let copyMessageRef = document.getElementById(specificID);
            copyMessageRef.style.opacity = '0';
        }, 2000)
    }

    return (
        <>
            <form>
                <GhostToFocus readOnly ref={(ref) => { setGhostText(ref) }} id="org-card-ghost">Shhhhhh</GhostToFocus>
                <Email readOnly ref={(ref) => { setTextToCopy(ref) }} >{props.email}</Email>
            </form>
            <CopyButtonContainer>
                <CopyEmail onClick={copyEmail}>Copy Email</CopyEmail>
                <CopyMessage ref = {(ref) => {setCopyMessageRed(ref)}} color={copyMessage.color} id={specificID}>{copyMessage.message}</CopyMessage>
            </CopyButtonContainer>
        </>
    )
}

export default EmailCopy;