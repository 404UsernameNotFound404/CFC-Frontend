import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DaxtonImage from '../../../img/default.jpg'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import BasicButton from '../../ComponentLibrayer/BasicButton';
import { BASEURL } from '../../../Constants'
import Cookie from 'js-cookie'
import LoadingComp from '../../ComponentLibrayer/LoadingPage'

const axios = require("axios");

const Page = styled.div`
    margin-top: 10em;
`;

type TitleProps = {
    error: boolean
}

const Title = styled.h1<TitleProps>`
    color: ${p => p.error ? "red" : "green"};
    text-align: center;
    font-size: 3em;
`;

const GoToLogin = styled.div``;

const SubTitle = styled.h4`
    text-align: center;
    font-size: 2em;
`;

const LoginLink = styled(Link)``;

function Verify() {
    const [loading, setLoading] = useState(true);
    const [messageToUser, setMessageToUser] = useState({ text: "", error: false })

    useEffect(() => {
        checkVerification()
    }, [])

    const checkVerification = async () => {
        let params = new URLSearchParams(document.location.search.substring(1));
        let Auth = params.get("auth");
        if (Auth != null) {
            try {
                const res = await axios.post(`${BASEURL}/verifyEmail`, JSON.stringify({ Auth: Auth }));
                if (res.data.Valid.length >= 1) {
                    setMessageToUser({ text: "Verification Complete", error: false })
                    setLoading(false)
                    return
                }
            } catch (err) {
                setMessageToUser({ text: "Verification Failed", error: true })
                setLoading(false)
                return
            }
        }
        setLoading(false)
        setMessageToUser({ text: "No Auth Code In URL", error: true })
    }
    if (!loading) {
        return (
            <Page>
                <Title error={messageToUser.error}>{messageToUser.text}</Title>
                <GoToLogin>
                    <SubTitle>Go To Login Page <LoginLink to='/login'>Login</LoginLink></SubTitle>
                </GoToLogin>
            </Page>
        )
    } else {
        return (
            <LoadingComp />
        )
    }
}

export default Verify;