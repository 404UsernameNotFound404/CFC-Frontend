import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LogoImg from '../../img/placeholder.png';
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";
import Cookie from 'js-cookie';
import { connect } from 'react-redux';

const Container = styled.div`
    top: 0;
    position: fixed;
    width: 100%;
    display: flex;
    padding: 0.5em 0.25em;
    z-index: 100;
`;

const RightPart = styled.div`
    margin-left: auto;
    display: flex;
`;

const LogoTitle = styled(Link)`
    font-size: 2em;
    margin: 0;
    margin-top: auto;
    font-weight: bolder;
    font-family: 'Big Shoulders Display', cursive;
    font-weight: lighter;
    color: black;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const LinkTitle = styled(Link)`
    font-size: 1.25em;
    margin: 0 0.5em;
    margin-top: auto;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    cursor: pointer;
    color: black;
    font-weight: bold;
`;

const BlueColor = styled.span`
    color: #3c78d8;
`;

const Content = styled.div`
    width: 75em;
    margin: auto;
    height: 2.5em;
    display: flex;
`;

type NavBarProps = {
    login: Function,
    logedIn: boolean,
    showNavBar: boolean
}

function NavBar(props: NavBarProps) {
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const logoutLogin = () => {
        if(props.logedIn) {
            props.login({ JWTToken: "" })
        } else {
            setRedirectToLogin(true);
        }
    }
    useEffect(() => {
        setRedirectToLogin(false);
    }, [props])
    if (props.showNavBar) {
        return (
            <Container>
                {redirectToLogin ? <Redirect to='/login' /> : ''}
                <Content>
                    <LogoTitle to='/home'>Connecting For Change</LogoTitle>
                    <RightPart>
                        {props.logedIn ? <LinkTitle to='/edit'>Profile Page</LinkTitle> : ""}
                        <LinkTitle to='/home'>About Page</LinkTitle>
                        <LinkTitle to='/search'><BlueColor>Search For A Activist</BlueColor></LinkTitle>
                        <LinkTitle to='/login'><span onClick={logoutLogin}>{props.logedIn ? "logout" : "login"}</span></LinkTitle>
                    </RightPart>
                </Content>
            </Container>
        );
    } else {
        return <div></div>
    }
}

const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatchMethod: any) => {
    return {
        login: (loginInfo: any) => { dispatchMethod({ type: 'LOGIN', loginInfo: loginInfo }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
