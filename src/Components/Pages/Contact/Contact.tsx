import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ProtesterImage from '../../../img/protesterYelling.webp'
import { useMediaQuery } from 'react-responsive';
import { AppContext } from '../../../Context/AppContext';
import EmailCopy from '../../ComponentLibrayer/EmailCopy';

const axios = require("axios");

const Page = styled.div`
    width: 75em;
    margin: auto;
    margin-top: 10em;
    display: flex;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 100%;
    }
`;

const Title = styled.h1`
    margin: 0;
    font-size: 4em;
    text-align: left;
    background: linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 50%, rgba(0,212,255,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        text-align: center;
    }
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
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        font-size: 1.5em;
        text-align: center;
    }
`;

const TextContainer = styled.div`
    width: 50%;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 90%;
        margin: auto;
    }
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
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        padding: 4% 1%;
    }
`;

function ContactPage() {
    const [textToCopy, setTextToCopy] = useState()
    const c = useContext(AppContext);
    const isPhone = useMediaQuery({minDeviceWidth: parseInt(process.env.REACT_APP_PHONE_BREAK)})

    const copyEmail = async (e: any) => {
        textToCopy.select();
        await document.execCommand('copy');
        c.setMessageToUser({message: "Copied Email", colour: "green"});
    }

    return (
        <Page>
            <TextContainer>
                <Title>Want to get in touch?</Title>
                <form>
                    <ContactInfo readOnly ref = {(ref) => {setTextToCopy(ref)}}>admin@connecting-for-change.ca</ContactInfo>
                </form>
                {document.queryCommandSupported('copy') ?  <CopyButton onClick = {copyEmail}>Copy Email</CopyButton> : ""}
                <EmailCopy email = {"admin@connecting-for-change.ca"} />
            </TextContainer>
            {isPhone ? <Image src = {ProtesterImage} /> : ''}
        </Page>
    )
}

export default ContactPage;