import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import BasicButton from '../../packages/BasicButton';
import { AppContext } from '../../../Context/AppContext';
import LoadingPage from '../../packages/LoadingPage';
const axios = require('axios')


const Page = styled.form`
    padding-top: 5em;
    width: 75em;
    margin: auto;
`;

type MessageProps = {
    color: string
}
const Message = styled.h4<MessageProps>`
    color: ${p => p.color};
    text-align: center;
`;

const LoginInput = styled.input`
    width: 100%;
    margin: 0.5em auto;
    padding: 0.5em 0em;
    font-size: 1em;
    border: none;
    background-color: transparent;
    border-bottom: thin solid grey;
    /* text-align: center; */
    &:focus {
        outline: none;
    }
`;

const Inputs = styled.div`
    width: 12.5em;
    margin: auto;
`;

const Text = styled.h4`
    text-align: center;
    font-size: 1.5em;
`;

function ForgotPage() {
    const [password, setPassword] = useState({ password: "", re_enter_password: "" })
    const [auth, setAuth] = useState("");
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const c = useContext(AppContext);

    useEffect(() => {
        verify();
    }, [])

    const verify = () => {
        try {
            let params = new URLSearchParams(document.location.search.substring(1));
            let Auth = params.get("auth");
            if (Auth == null) throw "Can't Find Auth Code."
            setAuth(Auth)
        } catch (err) {
            setRedirectToLogin(true);
        }
    }

    const resetPassword = async (e?: any) => {
        try { e.preventDefault(); } catch (err) { }
        try {
            setLoading(true);
            if (password.re_enter_password != password.password) throw "Password and re-entered password must be the same."
            if (!!password.password[1].match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) throw "Password must be 8 characters with atleast one number and letter";
            let res = await axios.post(`${process.env.REACT_APP_BASEURL}/user/forgotPassword/verify`, { VerificationCode: auth, Password: password.password });
            if (res.data.Error != undefined) throw res.data.Error;
            c.setMessageToUser({ colour: "green", message: "Password Is Reset" })
            setRedirectToLogin(true);
        } catch(err) {
            if (typeof err == "string") {
                c.setMessageToUser({ colour: "red", message: err })
            }
            c.setMessageToUser({ colour: "red", message: "Error completing process." })
        }
    }

    if (!loading) {
        return (
            <Page onSubmit = {resetPassword}>
                {redirectToLogin ? <Redirect to = "/login" /> : ''}
                <Text>To Reset Your Password Please Enter And Confirm New Password</Text>
                <Inputs>
                    <LoginInput onChange={(e) => { setPassword({ password: e.target.value, re_enter_password: password.re_enter_password }) }} value={password.password} placeholder="Reset Your Password" type='password' />
                    <LoginInput onChange={(e) => { setPassword({ password: password.password, re_enter_password: e.target.value }) }} value={password.re_enter_password} placeholder="Re-enter Your Password" type='password' />
                </Inputs>
                <BasicButton activateButton={resetPassword} width={"18%"} text={"Submit"} active={false} id={20} />
            </Page>
        )
    } else {
        return (
            <LoadingPage />
        )
    }
    
}

export default ForgotPage;