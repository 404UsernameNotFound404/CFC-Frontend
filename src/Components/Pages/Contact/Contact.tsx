import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ProtesterImage from '../../../img/protesterYelling.webp'
import { useMediaQuery } from 'react-responsive';
import { AppContext } from '../../../Context/AppContext';
import EmailCopy from '../../packages/EmailCopy';
import ParagraphInput from '../../packages/ParaInput/ParaInput';
import LoadingPage from '../../packages/LoadingPage';

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
    margin-bottom: 0.5em;
    font-size: 4em;
    text-align: left;
    background: linear-gradient(135deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 50%, rgba(0,212,255,1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        text-align: center;
    }
`;

const TextContainer = styled.div`
    width: 50%;
    padding-bottom: 1em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 90%;
        margin: auto;
    }
`;

const Image = styled.img`
    width: 50%;
    height: 41em;
    object-fit: cover;
    border: thick black solid;
    border-radius: 0.5em;
`;

const InputTitle = styled.h3`
    font-size: 1.5em;
    margin: 0;
    margin-bottom: 0em;
`;

const Input = styled.input`
    width: 40%;
    margin: 0;
    margin-bottom: 1em;
    padding: 0.5em 0em;
    font-size: 1em;
    border: none;
    background-color: transparent;
    border-bottom: thin solid grey;
    &:focus {
        outline: none;
    }
`;

const SendFeedBack = styled.div`
    border-radius: 5em;
    background-color: lightgreen;
    width: fit-content;
    padding: 0.5em 1em;
    font-size: 1.25em;
    margin-bottom: 1em;
    cursor: pointer;
    &:hover {
        background-color: #84d884;
    }
`;

const OR = styled.h4`
    font-size: 1.5em;
    margin: 0;
    margin-left: 3em;
    margin-bottom: 0.5em;
`;

function ContactPage() {
    const [textToCopy, setTextToCopy] = useState()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);
    const c = useContext(AppContext);
    const isPhone = useMediaQuery({ minDeviceWidth: parseInt(process.env.REACT_APP_PHONE_BREAK) });

    const sendFeedBack = async () => {
        try {
            if (name.length <= 1 || email.length <= 1 || body.length <= 1) throw "Must have at least one character in each input"
            setLoading(true);
            const resRaw = await fetch(`${process.env.REACT_APP_BASEURL}/feedBack`, {
                method: "POST",
                body: JSON.stringify({
                    Email: email,
                    Name: name,
                    Body: body
                })
            })
            const res = await resRaw.json();
            if (res.Error) throw res.Error
            c.setMessageToUser({ message: "Feedback Sent!\nThanks", colour: "green" })
            setBody("");
            setEmail("");
            setName("");
            setLoading(false);
        } catch (err) {
            if (typeof err == "string") {
                c.setMessageToUser({ message: err, colour: "red" })
            }
            c.setMessageToUser({ message: "Error sending feedback", colour: "red" })
            setLoading(false);
        }
    }

    return (
        <Page>
            <TextContainer>
                {!loading ? 
                <>
                    <Title>Want to get in touch?</Title>
                    <InputTitle>Name</InputTitle>
                    <Input value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Please Enter Name" />
                    <InputTitle>Email</InputTitle>
                    <Input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Please Enter Email" />
                    <InputTitle>Body</InputTitle>
                    <div style={{ marginTop: '-2em' }} />
                    <ParagraphInput height={"10em"} width={"80%"} margin={"0"} title={""} paragraphValue={body} setParagraphValue={setBody} editMode={true} />
                    <SendFeedBack onClick={sendFeedBack} >Send Feedback</SendFeedBack>
                    <OR>OR</OR>
                    <EmailCopy email={"admin@connecting-for-change.ca"} />
                </>
                    : <LoadingPage />
                }
            </TextContainer>
            {isPhone ? <Image src={ProtesterImage} /> : ''}
        </Page>
    )
}

export default ContactPage;