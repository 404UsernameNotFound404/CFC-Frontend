import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import SelectCauses from './SelectCauses';
import BasicButton from '../../packages/BasicButton';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import { AppContext } from '../../../Context/AppContext';
import OrgRegisterInfoInput from './OrgRegisterInfoInput';
import PhonNumberInput from './PhoneNumberInput';
import CheckBox from '../../packages/CheckBox';
import LoadingGif from '../../../img/loading.gif'


const axios = require('axios')

const Content = styled.form`
    width: 40%;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        width: 60%;
    }
    margin: 3em auto;
    margin-bottom: 0.5em;
    height: fit-content;
    padding: 0 2%;
    padding-top: 1.5%;
    padding-bottom: 0%;
    border-radius: 1em;
`;

const LoginInput = styled.input`
    width: 100%;
    margin: 0.5em auto;
    padding: 0.5em 0em;
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

const TextForForgotPassword = styled.h4`
    font-size: 1.5em;
    margin: 0;
    text-align: center;
`;

const LoadingSymbol = styled.img`
    width: 50%;
    height: fit-content;
    margin: auto;
    display: block;
`;

type Props = {
    register: number
    setRegister: Function,
    orgRegister: boolean
}

function LoginForm(props: Props) {
    const [registerValues, setRegisterValues] = useState(["", "", "", "", "", "", "", "", ""])
    const [emailInput, setEmailInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [authToken, setAuthToken] = useState("");
    const c = useContext(AppContext);
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState("");
    const [phoneNumber, setPhoneNumber] = useState<{ first: string, middle: string, end: string }>({ first: '', middle: '', end: '' })
    const [checkBox, setCheckBox] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const login = async (e: any) => {
        let networkError = true;
        //this is so enter key works, but I can also activate login through a function
        try { e.preventDefault(); } catch (err) { }
        props.setRegister(99);
        try {
            let res = await axios.post(`${process.env.REACT_APP_BASEURL}/user/login`, { Email: emailInput, Password: passwordInput });
            networkError = false;
            if (res.data.AuthToken != undefined) {
                c.login(res.data.AuthToken, res.data.Type, res.data.UserID, rememberMe);
                setRedirectToHome(true);
                return
            }
            if (res.data.Error != undefined) {
                throw res.data.Error
            }
            throw 'invalid login'
        }
        catch (err) {
            props.setRegister(0);
            if (networkError) {
                c.setMessageToUser({ colour: "red", message: "Network Error Sorry For Inconveince" });
                setRedirectToHome(false);
            } else {
                c.setMessageToUser({ colour: "red", message: err });
                setRedirectToHome(false);
            }
        }
    }

    const forgotPassword = async (e?: any) => {
        try { e.preventDefault(); } catch (err) { }
        try {
            props.setRegister(99);
            if (!registerValues[0].match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) throw "Email is not properly formated";
            let res = await axios.post(`${process.env.REACT_APP_BASEURL}/user/forgotPassword/send`, { Email: registerValues[0] });
            if (res.data.Error != undefined) throw res.data.Error
            c.setMessageToUser({ colour: "green", message: "Email sent please check your inbox." })
        } catch (err) {
            props.setRegister(2);
            if (typeof err == "string") {
                c.setMessageToUser({ colour: "red", message: err })
            }
            c.setMessageToUser({ colour: "red", message: "Error Process Failed" })
        }

    }

    const goToHome = () => {
        if (redirectToHome) {
            return <Redirect to='/home' />
        }
    }

    const register = async () => {
        try {
            if (!checkBox) throw "Must agree to privacy policy"
            //checking if the password and re-entred passwords match
            if (registerValues[1] != registerValues[2]) {
                c.setMessageToUser({ colour: "red", message: "Passwords do not match" })
                funcSetRegisterValues("", 1);
                funcSetRegisterValues("", 2);
                return;
            }
            
            //password minum requirement check(Must be at least eight characters and have 1 number and letter)
            if (!registerValues[1].match(/^(?=.*[A-z])(?=.*[0-9])\S{8,}$/)) {
                console.log("this is error")
                c.setMessageToUser({ colour: "red", message: "Password must be 8 characters with atleast one number and letter" })
                funcSetRegisterValues("", 1);
                funcSetRegisterValues("", 2);
                return;
            } else {
                console.log("Password is okay dokey")
            }

            //email check
            if (!registerValues[0].match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                c.setMessageToUser({ colour: "red", message: "Email is not properly formated" })
                funcSetRegisterValues("", 0);
                return;
            }
            //name check
            if (registerValues[4].length < 3) {
                c.setMessageToUser({ colour: "red", message: "Name must be more then three characters" })
                funcSetRegisterValues("", 4);
                return;
            }
            if ((phoneNumber.first.length != 3 || phoneNumber.middle.length != 3 || phoneNumber.end.length != 4) && (phoneNumber.first.length != 0 || phoneNumber.middle.length != 0 || phoneNumber.end.length != 0)) {
                c.setMessageToUser({ colour: "red", message: "Phone Number not properly formatted(not mandatory)" })
                setPhoneNumber({ first: '', middle: '', end: '' })
                return;
            }
            let phoneNumberString = ''
            if (phoneNumber.first.length >= 1) {
                phoneNumberString = phoneNumber.first + '-' + phoneNumber.middle + '-' + phoneNumber.end;
            }
            if (!props.orgRegister) {
                props.setRegister(99);
                let res = await axios.post(`${process.env.REACT_APP_BASEURL}/user/register`, { Email: registerValues[0], Password: registerValues[1], PhoneNumber: phoneNumberString, Name: registerValues[4], Type: 0 });
                if (res.data.Valid != undefined) {
                    c.setMessageToUser({ colour: "green", message: "Registered Successfully. Please now check your email to verify it is you." })
                    props.setRegister(0);
                    return
                }
                c.setMessageToUser({ colour: "red", message: res.data.Error })
            } else {
                if (registerValues[5].length < 3) {
                    c.setMessageToUser({ colour: "red", message: "Location must be more then three characters" })
                    funcSetRegisterValues("", 5);
                    return;
                }
                if (registerValues[6].length < 3) {
                    c.setMessageToUser({ colour: "red", message: "Link must be more then three characters" })
                    funcSetRegisterValues("", 6);
                    return;
                }
                if (description.length < 10) {
                    c.setMessageToUser({ colour: "red", message: "Description must be more then 10 characters must be more then three characters" })
                    setDescription("");
                    return;
                }
                let activeTags: number[] = []
                categories.map(ele => {
                    if (!ele.disabled) {
                        try {
                            activeTags.push(parseInt(ele.ID))
                        } catch (err) { }
                    }
                })

                props.setRegister(99);
                let res = await axios.post(`${process.env.REACT_APP_BASEURL}/user/register`, { Email: registerValues[0], Password: registerValues[1], PhoneNumber: phoneNumberString, Name: registerValues[4], Location: registerValues[5], Desc: description, Link: registerValues[6], Instrests: activeTags, Type: 1 });
                if (res.data.Valid != undefined) {
                    c.setMessageToUser({ colour: "green", message: "Registered Successfully" })
                    props.setRegister(0);
                    return
                }
                c.setMessageToUser({ colour: "red", message: res.data.Error })
            }
        }
        catch (err) {
            props.setRegister(1);
            if (typeof err == "string") {
                c.setMessageToUser({ colour: "red", message: err })
                return
            }
            c.setMessageToUser({ colour: "red", message: "Error creating account" })
        }
    }

    const funcSetRegisterValues = (value: any, ind: number) => {
        setRegisterValues(registerValues.map((ele, i) => (ind == i ? value : ele)))
    }

    //0 = login
    //1 = register
    //2 = forgot password
    //99 = loading
    switch (props.register) {
        case 0:
            return (
                <Content onSubmit={login}>
                    <LoginInput onChange={(e) => { setEmailInput(e.target.value) }} value={emailInput} placeholder="Email Address" />
                    <BreakLine />
                    <LoginInput onChange={(e) => { setPasswordInput(e.target.value) }} value={passwordInput} placeholder="Password" type='password' />
                    <BasicButton activateButton={login} width={"50%"} text={"Login"} active={false} id={20} />
                    <CheckBox text={{ __html: "Remember Me" }} checked={rememberMe} setChecked={setRememberMe} />
                    <input type="submit" style={{ display: "none" }} />
                    {goToHome()}
                </Content>
            );
            break;
        case 1:
            return (
                <Content>
                    <LoginInput value={registerValues[0]} onChange={(e) => { funcSetRegisterValues(e.target.value, 0) }} placeholder="*Please Enter Email" />
                    <BreakLine />
                    <LoginInput value={registerValues[1]} onChange={(e) => { funcSetRegisterValues(e.target.value, 1) }} placeholder="*Enter Password" type='password' />
                    <BreakLine />
                    <LoginInput value={registerValues[2]} onChange={(e) => { funcSetRegisterValues(e.target.value, 2) }} placeholder="*Re-Enter Password" type='password' />
                    <BreakLine />
                    <PhonNumberInput phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
                    <LoginInput value={registerValues[4]} onChange={(e) => { funcSetRegisterValues(e.target.value, 4) }} placeholder="*Name" />
                    <BreakLine />
                    {
                        (props.orgRegister) ?
                            <>
                                <LoginInput value={registerValues[5]} onChange={(e) => { funcSetRegisterValues(e.target.value, 5) }} placeholder="*Location" />
                                <BreakLine />
                                <LoginInput value={registerValues[6]} onChange={(e) => { funcSetRegisterValues(e.target.value, 6) }} placeholder="*Link" />
                                <OrgRegisterInfoInput description={description} setDescription={setDescription} categories={categories} setCategories={setCategories} />
                            </>
                            :
                            ""
                    }
                    <CheckBox text={{ __html: `You agree with our privacy policy. <span><a target="_blank" href = "/Privacy-Policy">Privacy Policy</a></span>` }} checked={checkBox} setChecked={setCheckBox} />
                    <BasicButton activateButton={register} width={"45%"} text={"Register"} active={false} id={20} />
                </Content>
            );
            break;
        case 2:
            return (
                <Content onSubmit={forgotPassword}>
                    <TextForForgotPassword>Enter your email and we will send a link to change your password.</TextForForgotPassword>
                    <LoginInput value={registerValues[0]} onChange={(e) => { funcSetRegisterValues(e.target.value, 0) }} placeholder="Enter Email Associated With Account" />
                    <BasicButton activateButton={forgotPassword} width={"45%"} text={"Submit"} active={false} id={20} />
                </Content>
            )
            break;
        case 99:
            return (
                <>
                    <LoadingSymbol src={LoadingGif} />
                </>
            )
            break;
        default:
            return (
                <>
                </>
            )
    }
}

export default LoginForm;
