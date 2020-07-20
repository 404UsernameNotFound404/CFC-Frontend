import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import BasicButton from '../../packages/BasicButton';
import ProtestPhoto from '../../../img/protestCrowd.jpg';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import { AppContext } from '../../../Context/AppContext';
import PickWhatToCreate from './PickWhatToCreate';


const axios = require('axios');


const Page = styled.div`
    width: 75em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        width: 95%;
    }
    min-height: 97.75vh;
    height: fit-content;
    margin: auto;
    display: flex;
    justify-content: center;
`;

const SubTitle = styled.h1`
    margin: 0.2em;
    font-size: 2em;
    text-align: center;
    margin-top: 1em;
`;

const Content = styled.div`
    height: fit-content;
    width: 100%;
    margin: auto 0;
    margin-left: 40%;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        margin: auto;
    }
    padding-bottom: 2em;
`;

const BackgroundImage = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
    background-color: black;
`;

const BackgroundImageOverlay = styled.div`
    width: 100%;
    height: 100%;
    /* background-color: rgba(0,0,0,0.5); */
    /* background-color: rgba(255,255,255,0.1); */
    position: absolute;
    top: 0;
    left: 0;
`;

const BackgroundImageContainer = styled.div`
    width: 33vw;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
    background-color: red;
`;

const RegisterAndForgotUsername = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const ForgotRegisterText = styled.p`
    margin: 0 0.5em;
    font-size: 1em;
    color: grey;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`;

const SkipAndGoToHome = styled.div`
    background-color: forestgreen;
    width: 14em;
    padding: 0.5em 0;
    margin: auto;
    border-radius: 1em;
    text-align: center;
    color: white;
    margin-top: 1em;
    cursor: pointer;
    &:hover {
        color: black;
    }
`;

const ForgotPassword = styled.p`
    margin: 0;
    text-align: center;
    font-size: 1em;
    color: #3d3dff;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

function LoginPage() {
    const c = useContext(AppContext);
    const [register, setRegister] = useState(0);
    const [orgRegister, setOrgRegister] = useState(false);
    const [reToHome, setReToHome] = useState(false);
    const isPhone = useMediaQuery({ minDeviceWidth: parseInt(process.env.REACT_APP_PHONE_BREAK, 10) })

    const registerClick = (whatToSwitch: number, orgRegisterIn: boolean) => {
        setOrgRegister(orgRegisterIn)
        setRegister(whatToSwitch)
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        let registerValue = urlParams.get('register')
        if (registerValue == 'organization') {
            setRegister(1)
        }
        if (registerValue == 'user') {
            setRegister(2)
        }
    }, [])

    return (
        <Page>
            {c.loggedIn ? <Redirect to='/home' /> : ''}
            {isPhone ?
                <BackgroundImageContainer>
                    <BackgroundImage src={ProtestPhoto} />
                </BackgroundImageContainer>
                : ""
            }
            <Content>
                <SubTitle>Ready to make a change?</SubTitle>
                <LoginForm orgRegister = {orgRegister} setRegister={setRegister} register={register} />
                <RegisterAndForgotUsername>
                    {(register != 0) ?
                        <ForgotRegisterText onClick={() => { registerClick(0, false); }}>Go To Login</ForgotRegisterText>
                        :
                        <div>
                            <PickWhatToCreate registerOrg={() => { registerClick(1, true) }} registerUser={() => { registerClick(1, false) }} />
                            <ForgotPassword onClick={() => { registerClick(2, false) }}>Forgot Password?</ForgotPassword>
                        </div>
                    }
                </RegisterAndForgotUsername>

                <SkipAndGoToHome onClick={() => { setReToHome(true) }}>Skip And Go To Home Page</SkipAndGoToHome>
            </Content>
            {reToHome ? <Redirect to='/home' /> : ''}
        </Page>
    );
}

export default LoginPage;

