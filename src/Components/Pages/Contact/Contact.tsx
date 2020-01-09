import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cookie from 'js-cookie'
import ProtesterImage from '../../../img/protesterYelling.webp'
import { async } from 'q';

const axios = require("axios");

const Page = styled.div`
    width: 75em;
    margin: auto;
    margin-top: 10em;
    display: flex;
`;

const Title = styled.h1`
    margin: 0;
    font-size: 4em;
    text-align: left;
    background: linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 50%, rgba(0,212,255,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const ContactInfo = styled.textarea`
    font-size: 2.5em;
    text-align: left;
    background-color: none !important; 
    border: none;
    font-family: 'Cormorant Garamond', serif;
    width: 100%;
    margin-top: 1em;
    resize: none;
`;

const TextContainer = styled.div`
    width: 50%;
`;

const Image = styled.img`
    width: 50%;
    height: 60vh;
    object-fit: cover;
    border: thick black solid;
    border-radius: 0.5em;
`;

const CopyButton = styled.div`
    width: 40%;
    padding: 2% 0;
    font-size: 1.5em;
    border-radius: 1em;
    margin: auto;
    text-align: center;
    color: white;
    background-color: rgb(28, 106, 176);
    &:hover {
        background-color: rgb(10, 80, 155)
    }
    cursor: pointer;
`;

const MessageToUser = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: lightgreen;
    left: 0;
    border-top: lightgrey solid 0.15em;
    display: flex;
`;

const MessageToUserText = styled.h2`
    color: darkgreen;
    margin: auto 0;
    margin-left: 1em;
`;

const XOut = styled.h1`
    margin-left: auto;
    margin-right: 1em;
    color: grey;
    cursor: pointer;
    &:hover {
        color: lightgrey;
    }
`;

const ContactInfoContent = styled.h1``;

function ContactPage() {
    const [textToCopy, setTextToCopy] = useState()
    const [showSuccess, setHowSuccess] = useState(false);

    const copyEmail = async (e: any) => {
        textToCopy.select();
        await document.execCommand('copy');
        setHowSuccess(true);
    }

    return (
        <Page>
            <TextContainer>
                <Title>Want to get in touch?</Title>
                <form>
                    <ContactInfo readOnly ref = {(ref) => {setTextToCopy(ref)}}>connecting4changeinfo@gmail.com</ContactInfo>
                </form>
                {document.queryCommandSupported('copy') ?  <CopyButton onClick = {copyEmail}>Copy Email</CopyButton> : ""}
                {showSuccess ?  <MessageToUser>
                    <MessageToUserText>Message Copied</MessageToUserText>
                    <XOut onClick = {() => {setHowSuccess(false)}}>X</XOut>
                </MessageToUser> : ""}
               
            </TextContainer>
            <Image src = {ProtesterImage} />
        </Page>
    )
}

export default ContactPage;