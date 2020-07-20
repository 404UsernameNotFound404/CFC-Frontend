import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import DaxtonImage from '../../../img/default.jpg'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import BasicButton from '../../packages/BasicButton';
import LoadingComp from '../../packages/LoadingPage'
import { AppContext } from '../../../Context/AppContext';

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
    const c = useContext(AppContext)
    useEffect(() => {
        checkVerification()
    }, [])

    const checkVerification = async () => {
        let params = new URLSearchParams(document.location.search.substring(1));
        let Auth = params.get("auth");
        if (Auth != null) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_BASEURL}/user/verifyEmail`, JSON.stringify({ Auth: Auth }));
                if (res.data.Valid.length >= 1) {
                    c.setMessageToUser({ message: "Verification Complete", error: false })
                    setLoading(false)
                    return
                }
            } catch (err) {
                c.setMessageToUser({ message: "Verification Failed", error: true })
                setLoading(false)
                return
            }
        }
        setLoading(false)
        c.setMessageToUser({ message: "No Auth Code In URL", error: true })
    }
    if (!loading) {
        return (
            <Page>
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