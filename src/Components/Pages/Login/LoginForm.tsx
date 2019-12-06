import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import SelectCauses from './SelectCauses';
import BasicButton from '../../ComponentLibrayer/BasicButton';
import { BASEURL } from '../../../Constants'
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import { AppContext } from '../../../Context/AppContext';
import Cookie from 'js-cookie'
import OrgRegisterInfoInput from './OrgRegisterInfoInput';

const axios = require('axios')

const Content = styled.div`
    width: 40%;
    @media (max-width: 768px) {
        width: 60%;
    }
    margin: 3em auto;
    height: fit-content;
    padding: 0 2%;
    padding-top: 1.5%;
    padding-bottom: 0%;
    border-radius: 1em;
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
    register: number
    setRegister: Function
}

function LoginForm(props: Props) {
    const [registerValues, setRegisterValues] = useState(["", "", "", "", "", "", "", "", ""])
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [authToken, setAuthToken] = useState("");
    const [message, setMessage] = useState({ error: false, message: "" })
    const c = useContext(AppContext);
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (categories.length == 0) {
            getCategories();
        }
    }, [props.register])
    
    const getCategories = async () => {
        const res = await axios.post(`${BASEURL}/getCategories`);
        setCategories(res.data.map((ele: any) => {
            return {...ele, disabled: true}
        }))
    }

    const login = async () => {
        let networkError = true;
        try {
            let res = await axios.post(`${BASEURL}/login`, { Email: emailInput, Password: passwordInput });
            networkError = false;
            if (res.data.AuthToken.length >= 0) {
                console.log(res.data)
                setAuthToken(res.data.AuthToken);
                setRedirectToHome(true);
            }
            throw 'invalid login'
        }
        catch (err) {
            console.log(err)
            if (networkError) {
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
            console.log(authToken)
            c.setUserToken(authToken)
            Cookie.set("authToken", authToken)
            c.setLoggedIn(true)
            return <Redirect to='/home' />
        }
    }

    const register = async () => {
        try {
            //checking if the password and re-entred passwords match
            if (registerValues[1] != registerValues[2]) {
                setMessage({ error: true, message: "Passwords do not match" })
                funcSetRegisterValues("", 1);
                funcSetRegisterValues("", 2);
                return;
            }
            //password minum requirement check(Must be at least eight characters and have 1 number and letter)
            if (!registerValues[1].match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
                setMessage({ error: true, message: "Password must be 8 characters with atleast one number and letter" })
                funcSetRegisterValues("", 1);
                funcSetRegisterValues("", 2);
                return;
            }
            //email check
            if (!registerValues[0].match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                setMessage({ error: true, message: "Email is not properly formated" })
                funcSetRegisterValues("", 0);
                return;
            }
            //name check
            if (registerValues[4].length < 3) {
                setMessage({ error: true, message: "Name must be more then three characters" })
                funcSetRegisterValues("", 4);
                return;
            }
            if (props.register == 2) {
                let res = await axios.post(`${BASEURL}/register`, { Email: registerValues[0], Password: registerValues[1], PhoneNumber: registerValues[3], Name: registerValues[4], Type: 0 });
                if (res.data.Valid != undefined) {
                    setMessage({ error: false, message: "Registered Successfully. Please now check your email to verify it is you. May be in spam" })
                    props.setRegister(false);
                    return
                }
                setMessage({ error: true, message: res.data.Error })
            } else {
                console.log("here")
                if (registerValues[5].length < 3) {
                    setMessage({ error: true, message: "Location must be more then three characters" })
                    funcSetRegisterValues("", 5);
                    return;
                }
                if (registerValues[6].length < 3) {
                    setMessage({ error: true, message: "Link must be more then three characters" })
                    funcSetRegisterValues("", 6);
                    return;
                }
                if (description.length < 10) {
                    setMessage({ error: true, message: "Description must be more then 10 characters must be more then three characters" })
                    setDescription("");
                    return;
                }
                let activeTags: number[] = []
                console.log("before this")
                categories.map(ele => {
                    if (!ele.disabled) {
                        try {
                            activeTags.push(parseInt(ele.ID))
                        } catch (err) {
                            console.log(err)
                        }
                    }
                })
                console.log({ Email: registerValues[0], Password: registerValues[1], PhoneNumber: registerValues[3], Name: registerValues[4], Location: registerValues[5], Desc: description, Link: registerValues[6], Instrests: activeTags, Type: 1})
                let res = await axios.post(`${BASEURL}/register`, { Email: registerValues[0], Password: registerValues[1], PhoneNumber: registerValues[3], Name: registerValues[4], Location: registerValues[5], Desc: description, Link: registerValues[6], Instrests: activeTags, Type: 1});
                if (res.data.Valid != undefined) {
                    setMessage({ error: false, message: "Registered Sucssfully" })
                    props.setRegister(false);
                    return
                }
                setMessage({ error: true, message: res.data.Error })
            }
        }
        catch (err) {
            console.log(err)
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

    if (props.register == 0) {
        return (
            <Content>
                <Message error={message.error}>{message.message}</Message>
                <LoginInput onChange={(e) => { setEmailInput(e.target.value) }} value={emailInput} placeholder="Email Address" />
                <BreakLine />
                <LoginInput onChange={(e) => { setPasswordInput(e.target.value) }} value={passwordInput} placeholder="Password" type='password' />
                <BasicButton activateButton={login} width={"50%"} text={"Login"} active={false} id={20} />
                {goToHome()}
            </Content>
        );
    } else {
        return (
            <Content>
                <Message error={message.error}>{message.message}</Message>
                <LoginInput value={registerValues[0]} onChange={(e) => { funcSetRegisterValues(e.target.value, 0) }} placeholder="*Please Enter Email" />
                <BreakLine />
                <LoginInput value={registerValues[1]} onChange={(e) => { funcSetRegisterValues(e.target.value, 1) }} placeholder="*Enter Password" type='password' />
                <BreakLine />
                <LoginInput value={registerValues[2]} onChange={(e) => { funcSetRegisterValues(e.target.value, 2) }} placeholder="*Re-Enter Password" type='password' />
                <BreakLine />
                <LoginInput value={registerValues[3]} onChange={(e) => { funcSetRegisterValues(e.target.value, 3) }} placeholder="Phone Number" />
                <BreakLine />
                <LoginInput value={registerValues[4]} onChange={(e) => { funcSetRegisterValues(e.target.value, 4) }} placeholder="*Name" />
                <BreakLine />
                {
                    (props.register == 1) ?
                        <>
                            <LoginInput value={registerValues[5]} onChange={(e) => { funcSetRegisterValues(e.target.value, 5) }} placeholder="*Location" />
                            <BreakLine />
                            <LoginInput value={registerValues[6]} onChange={(e) => { funcSetRegisterValues(e.target.value, 6) }} placeholder="*Link" />
                            <OrgRegisterInfoInput description={description} setDescription={setDescription} categories={categories} setCategories={setCategories} />
                        </>
                        :
                        ""
                }
                <BasicButton activateButton={register} width={"45%"} text={"Register"} active={false} id={20} />
            </Content>
        );
    }
}

export default LoginForm;
