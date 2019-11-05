import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import BasicButton from '../../ComponentLibrayer/BasicButton';
import ProtestPhoto from '../../../img/protestCrowd.jpg';
import {
    BrowserRouter as Router,
    Route,
    Redirect
  } from "react-router-dom";
import { connect } from 'react-redux';
import { useMediaQuery } from 'react-responsive'


const axios = require('axios');


const Page = styled.div`
    width: 75em;
    @media (max-width: 768px) {
        width: 95%;
    }
    
    height: 97.75vh;
    margin: auto;
    display: flex;
    justify-content: center;
`;

const SubTitle = styled.h1`
    margin: 0.2em;
    font-size: 2em;
    text-align: center;
`;

const Content = styled.div`
    height: fit-content;
    width: 100%;
    margin: auto 0;
    margin-left: 40%;
    @media (max-width: 768px) {
        margin: auto;
    }
    
`;

const BackgroundImage = styled.img`
    object-fit: cover;
    width: 100%;
    height: 100%;
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
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
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

type Props = {
    login: Function;
    loggedIn: boolean
}

function LoginPage(props: Props) {
    const [register, setRegister] = useState(false);
    const [reToHome, setReToHome] = useState(false); 
    const isPhone = useMediaQuery({ minDeviceWidth: 768 })

    const registerClick = () => {
        if(register) setRegister(false)
        else setRegister(true);
        //set inputs to zero later
    }

    return (
        <Page>
            {props.loggedIn ? <Redirect to = '/home' /> : ''}
            { isPhone ?
                <BackgroundImageContainer>
                    <BackgroundImage src={ProtestPhoto} />
                </BackgroundImageContainer>
                : ""
            }
            <Content>
                <SubTitle>Ready to make a change?</SubTitle>
                <LoginForm setRegister = {setRegister} register = {register}/>
                <RegisterAndForgotUsername>
                    {/* <ForgotRegisterText>Forgot Password?</ForgotRegisterText> */}
                    <ForgotRegisterText onClick={registerClick}>{register ? 'Go To Login' : 'Create An Acount'}</ForgotRegisterText>
                </RegisterAndForgotUsername>
                <SkipAndGoToHome onClick = {() => {setReToHome(true)}}>Skip And Go To Home Page</SkipAndGoToHome>
            </Content>
            {reToHome ? <Redirect to = '/home' /> : ''}
        </Page>
    );
}

const mapStateToProps = (state: any) => {
    return {
      loggedIn: state.loggedIn
    }
  }
  
  const mapDispatchToProps = (dispatchMethod: any) => {
    return {
        login: (user: any) => { dispatchMethod({type: 'LOGIN'})}
    }
  }
   
  export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
  
