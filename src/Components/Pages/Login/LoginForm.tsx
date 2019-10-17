import React, { useState }from 'react';
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
    let [causeSelection, setCauseSelection] = useState([
        {title: "Envorment", backgroundColor: "green", backgroundColorAct: "darkgreen", active: false, id: 0},
        {title: "Racial Justice", backgroundColor: "#c586c0", backgroundColorAct: "darkblue", active: false, id: 1},
        {title: "LGBTQ Rights", backgroundColor: "pink", backgroundColorAct: "darkblue", active: false, id: 2},
        {title: "Feminsim", backgroundColor: "orange", backgroundColorAct: "darkorange", active: false, id: 3}
    ]);
    let [registerValues, setRegisterValues] = useState(["","","","",""])
    let [emailInput, setEmailInput] = useState("");
    let [passwordInput, setPasswordInput] = useState("");
    let [redirectToHome, setRedirectToHome] = useState(false);
    let [authToken, setAuthToken] = useState("");
    const [message, setMessage] = useState({error: false, message: ""})

    const login = async() => {
        try {
            let res = await axios.post(`${BASEURL}/login`, {Email: emailInput, Password: passwordInput})
            console.log("working")
            if(res.data.AuthToken.length >= 0) {
                setAuthToken(res.data.AuthToken);
                setRedirectToHome(true);
            }
            throw 'invalid login'
        }
        catch(err) {
            console.log('error login')
            setMessage({error: true, message: "invalid login"})
            setRedirectToHome(false);
        }
    }

    const goToHome = () => {
        if(redirectToHome) {
            console.log("this should not run if invalid")
            props.login({JWTToken: authToken});
            return <Redirect to = '/home' />
        }
    }

    const register = async () => {
        try {
            //check if register was sucssful if so redirect to login
            // let res = await axios.post(`${BASEURL}/register`, {Email: emailInput, Password: passwordInput})
            // setAuthToken(res.data.AuthToken);
            // setRedirectToHome(true);
            setMessage({error: false, message: "Registered Sucssfully"})
            props.setRegister(false);
        }
        catch(err) {
            //display error message, and let them retry registering
        }
    }

    const funcSetRegisterValues = (e: any, ind: number) => {
        setRegisterValues(registerValues.map((ele, i) => {
            if(ind === i) {
                return e.target.value
            } else {
                return ele
            }
        }))
    }

    if(!props.register) {
        return (
            <Content>
                 <Message error = {message.error}>{message.message}</Message>
                <LoginInput onChange = {(e) => {setEmailInput(e.target.value)}} value = {emailInput} placeholder = "Email Address" />
                <BreakLine />
                <LoginInput onChange = {(e) => {setPasswordInput(e.target.value)}} value = {passwordInput} placeholder = "Password" type = 'password' />
                <BasicButton activateButton={login} width={"40%"} text={"Login"} active={false} id={20} />
                {goToHome()}
            </Content>
        );
    } else {
        return (
            <Content>
                <LoginInput value = {registerValues[0]} onChange = {(e) => {funcSetRegisterValues(e, 0)}} placeholder = "Email Address" />
                <BreakLine />
                <LoginInput  value = {registerValues[1]} onChange = {(e) => {funcSetRegisterValues(e, 1)}} placeholder = "Password" type = 'password' />
                <BreakLine />
                <LoginInput  value = {registerValues[2]} onChange = {(e) => {funcSetRegisterValues(e, 2)}} placeholder = "Re-Enter Password" type = 'password' />
                <BreakLine />
                <LoginInput  value = {registerValues[3]} onChange = {(e) => {funcSetRegisterValues(e, 3)}} placeholder = "Contact Email" />
                <BreakLine />
                <LoginInput  value = {registerValues[4]} onChange = {(e) => {funcSetRegisterValues(e, 4)}}placeholder = "Contact Phone Number" />
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
        login: (loginInfo: any) => { dispatchMethod({type: 'LOGIN', loginInfo: loginInfo})}
    }
  }
   
  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
