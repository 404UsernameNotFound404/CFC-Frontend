import React, { useState } from 'react';
import styled from 'styled-components';
import SelectCauses from './SelectCauses';
import { connect } from 'react-redux';
import BasicButton from '../../ComponentLibrayer/BasicButton';
import { BASEURL } from '../../../Constants'
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";
const axios = require('axios')

const Content = styled.div`
    width: 40%;
    margin: 3em auto;
    height: fit-content;
    padding: 0 2%;
    padding-top: 1.5%;
    padding-bottom: 0%;
    border-radius: 1em;
`;

const LoginTitle = styled.h1`
    font-size: 0.75em;
    color: grey;
    margin: 0;
`;

const LoginInput = styled.input`
    width: 100%;
    margin: 0.5em auto;
    padding: 0.5em 0.25em;
    font-size: 1em;
    border: none;
    background-color: transparent;
    border-bottom: thin solid grey;
    &:focus {
        outline: none;
    }
`;

const BreakLine = styled.div`
    margin: 0;
    margin-bottom: 1em;
    margin-left: -2%;
    width: 104%;
    height: 0.1em;
    /* background-color: grey; */
`;

type Message = {
    error: boolean
}

const Message = styled.h1<Message>`
    color: ${p => p.error ? "red" : "green"};
    margin: 0;
    margin-top: -0.5em;
    font-size: 1em;
    text-align: center;
`;

type Props = {
    register: boolean
    setRegister: Function
    login: Function
}

function LoginForm(props: Props) {
    const [causeSelection, setCauseSelection] = useState([
        { title: "Envorment", backgroundColor: "green", backgroundColorAct: "darkgreen", active: false, id: 0 },
        { title: "Racial Justice", backgroundColor: "#c586c0", backgroundColorAct: "darkblue", active: false, id: 1 },
        { title: "LGBTQ Rights", backgroundColor: "pink", backgroundColorAct: "darkblue", active: false, id: 2 },
        { title: "Feminsim", backgroundColor: "orange", backgroundColorAct: "darkorange", active: false, id: 3 }
    ]);
    const [registerValues, setRegisterValues] = useState(["", "", "", "", ""])
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [authToken, setAuthToken] = useState("");
    const [message, setMessage] = useState({ error: false, message: "" })

    const login = async () => {
        let networkError = true;
        try {
            let res = await axios.post(`${BASEURL}/login`, { Email: emailInput, Password: passwordInput })
            networkError = false;
            console.log(res)
            if (res.data.AuthToken.length >= 0) {
                setAuthToken(res.data.AuthToken);
                setRedirectToHome(true);
            }
            throw 'invalid login'
        }
        catch (err) {
           if(networkError) {
               setMessage({ error: true, message: "Network Error Sorry For Inconveince" });
               setRedirectToHome(false);
           } else {
                setMessage({ error: true, message: "invalid login" });
                setRedirectToHome(false);
           }
        }
    }

    const goToHome = () => {
        if (redirectToHome) {
            console.log("this should not run if invalid")
            props.login({ JWTToken: authToken });
            return <Redirect to='/home' />
        }
    }

    const register = async () => {
        try {
            if (registerValues[1] != registerValues[2]) {
                setMessage({ error: true, message: "Passwords do not match" })
                funcSetRegisterValues("", 1);
                funcSetRegisterValues("", 2);
                return;
            }
            if(!registerValues[1].match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
                setMessage({ error: true, message: "Password must be 8 characters with atleast one number and letter" })
                funcSetRegisterValues("", 1);
                funcSetRegisterValues("", 2);
                return;
            }
            if(!registerValues[0].match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setMessage({ error: true, message: "Email is not properly formated" })
                funcSetRegisterValues("", 0);
                return;
            }
            let res = await axios.post(`${BASEURL}/register`, { Email: registerValues[0], Password: registerValues[1], PhoneNumber: registerValues[3] });
            if (res.data.Valid.length > 0) {
                setMessage({ error: false, message: "Registered Sucssfully" })
                props.setRegister(false);
                return
            }
            setMessage({ error: true, message: "Error creating account" })
        }
        catch (err) {
            setMessage({ error: true, message: "Error creating account" })
        }
    }

    const funcSetRegisterValues = (value: any, ind: number) => {
        setRegisterValues(registerValues.map((ele, i) => {
            if (ind === i) {
                return value
            } else {
                return ele
            }
        }))
    }

    if (!props.register) {
        return (
            <Content>
                <Message error={message.error}>{message.message}</Message>
                <LoginInput onChange={(e) => { setEmailInput(e.target.value) }} value={emailInput} placeholder="Email Address" />
                <BreakLine />
                <LoginInput onChange={(e) => { setPasswordInput(e.target.value) }} value={passwordInput} placeholder="Password" type='password' />
                <BasicButton activateButton={login} width={"40%"} text={"Login"} active={false} id={20} />
                {goToHome()}
            </Content>
        );
    } else {
        return (
            <Content>
                <Message error={message.error}>{message.message}</Message>
                <LoginInput value={registerValues[0]} onChange={(e) => { funcSetRegisterValues(e.target.value, 0) }} placeholder="Please Enter Email" />
                <BreakLine />
                <LoginInput value={registerValues[1]} onChange={(e) => { funcSetRegisterValues(e.target.value, 1) }} placeholder="Enter Password" type='password' />
                <BreakLine />
                <LoginInput value={registerValues[2]} onChange={(e) => { funcSetRegisterValues(e.target.value, 2) }} placeholder="Re-Enter Password" type='password' />
                <BreakLine />
                <LoginInput value={registerValues[3]} onChange={(e) => { funcSetRegisterValues(e.target.value, 3) }} placeholder="Phone Number" />
                <BasicButton activateButton={register} width={"45%"} text={"Register"} active={false} id={20} />
            </Content>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
        posts: state.posts
    }
}

const mapDispatchToProps = (dispatchMethod: any) => {
    return {
        login: (loginInfo: any) => { dispatchMethod({ type: 'LOGIN', loginInfo: loginInfo }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
