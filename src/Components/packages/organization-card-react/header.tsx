import React, { useState } from 'react';
import styled from 'styled-components';

const Name = styled.h1`
    font-size: 1.75em;
    margin: 0.1em 0;
    width: 100%;
    height: 3.8em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* number of lines to show */
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        font-size: 1.5em;
    }
`;

const Location = styled.h1`
    font-size: 1.25em;
    height: 1.5em;
    width: 90%;
    margin: 0;
    font-weight: 400;
`;

const GhostToFocus = styled.textarea`
    position: absolute;
    left: -90000px;
`;

const CopyButtonContainer = styled.div`
    display: flex;
`;


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
    name: string;
    email: string;
    location: string;
}

export default function Header(props: Props) {
    const [textToCopy, setTextToCopy] = useState(null);
    const [ghostText, setGhostText] = useState(null);
    const [copyMessage, setCopyMessage] = useState({ message: '', color: 'red' })
    const { name, location, email } = props;
    const specificID = "super-long-never-going-to-be-the-same-as-someone-else-1234-asd-123-asdcvxvxgfdg-5940" + email;

    const copyEmail = async (e: any) => {
        //selecting email ele
        textToCopy.select();
        await document.execCommand('copy');
        //selecting a div way outside of view so the email is not visually every highlighted
        ghostText.select();
        setCopyMessage({ message: "Copied Email", color: "black" })
        //animation for copied message
        let copyMessage = document.getElementById(specificID);
        copyMessage.style.opacity = '1';
        setTimeout(() => {
            let copyMessage = document.getElementById(specificID);
            copyMessage.style.opacity = '0';
        }, 2000)
    }

    return (
        <>
            <Name>{name}</Name>
            <Location>{location.length >= 30 ? (location.substring(0, 30) + "...") : location}</Location>
            <form>
                <GhostToFocus readOnly ref={(ref) => { setGhostText(ref) }} id="org-card-ghost">Shhhhhh</GhostToFocus>
                <Email readOnly ref={(ref) => { setTextToCopy(ref) }} >{email}</Email>
            </form>
            <CopyButtonContainer>
                <CopyEmail onClick={copyEmail}>Copy Email</CopyEmail>
                <CopyMessage color={copyMessage.color} id={specificID}>{copyMessage.message}</CopyMessage>
            </CopyButtonContainer>
        </>
    )
}
