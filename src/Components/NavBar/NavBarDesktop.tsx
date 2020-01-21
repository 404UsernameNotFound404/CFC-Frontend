import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";
import DropDown from './DropDownMenu';
import { AppContext } from '../../Context/AppContext';
import ProfileDropDown from './ProfileDropDown';

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

const Content = styled.div`
    width: 75em;
    margin: auto;
    height: 2.5rem;
    display: flex;
    padding: 0.5em;
`;

const LightOverlay = styled.div`
    width: 100%;
    height: fit-content;
    background-color: rgba(255,255,255,0.8);
`;

type NavBarDekstopProps = {
    logoutLogin: any
}

function NavBarDesktop(props: NavBarDekstopProps) {
    const c = useContext(AppContext)
    return (
        <LightOverlay>
            <Content>
                <LogoTitle to='/home'>Connecting For Change</LogoTitle>
                <RightPart>
                    {c.loggedIn ? <LinkTitle to='/edit'>{(c.userType == 0) ? "Edit Your Page" : "Edit Organization Information"}</LinkTitle> : ""}
                    <LinkTitle to='/contact'>Contact Us</LinkTitle>
                    <LinkTitle to='/about'>About Page</LinkTitle>
                    <LinkTitle to='/learn'>Learn About The Issues</LinkTitle>
                    <DropDown options={[{ name: "Activists", link: "/search?search=Activists" }, { name: "Organizations", link: "/search?search=Organizations" }]} title={"Search"} />
                    {c.loggedIn ?
                        <ProfileDropDown loggedIn={c.loggedIn} logoutLogin={props.logoutLogin} /> :
                        <LinkTitle to='/login'><span onClick={props.logoutLogin}>Login</span></LinkTitle>
                    }
                </RightPart>
            </Content>
        </LightOverlay>
    );
}

export default NavBarDesktop;
