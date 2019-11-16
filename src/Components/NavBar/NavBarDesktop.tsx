import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";

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
    margin: auto 0.5em;
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
    padding: 0.5em;
`;

const LightOverlay = styled.div`
    width: 100%;
    height: fit-content;
    background-color: rgba(255,255,255,0.4);
`;

type NavBarDekstopProps = {
    logoutLogin: any
    logedIn: boolean
}

function NavBarDesktop(props: NavBarDekstopProps) {
    return (
        <LightOverlay>
            <Content>
                <LogoTitle to='/home'>Connecting For Change</LogoTitle>
                <RightPart>
                    {props.logedIn ? <LinkTitle to='/edit'>Profile Page</LinkTitle> : ""}
                    <LinkTitle to='/about'>About Page</LinkTitle>
                    <LinkTitle to='/learn'>Learn About The Issues</LinkTitle>
                    <LinkTitle to='/search'><BlueColor>Search For An Activist</BlueColor></LinkTitle>
                    <LinkTitle to='/login'><span onClick={props.logoutLogin}>{props.logedIn ? "Logout" : "Login"}</span></LinkTitle>
                </RightPart>
            </Content>
        </LightOverlay>
    );
}

export default NavBarDesktop;
