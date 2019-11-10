import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LogoImg from '../../img/placeholder.png';
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu'
import { useMediaQuery } from 'react-responsive'
import MobileNavBar from './MobileNavBar'
import DesktopNavBar from './NavBarDesktop'

const Container = styled.div`
    top: 0;
    position: fixed;
    width: 100%;
    display: flex;
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
    const isPhone = useMediaQuery({ minDeviceWidth: 768 })
   
    useEffect(() => {
        setRedirectToLogin(false);
    }, [props])

    const logoutLogin = () => {
        if (props.logedIn) {
            props.login({ JWTToken: "" })
        } else {
            setRedirectToLogin(true);
        }
    }

    if (props.showNavBar) {
        return (
            <Container>
                {redirectToLogin ? <Redirect to='/login' /> : ''}
                {isPhone ? 
                <DesktopNavBar logedIn = {props.logedIn} logoutLogin = {logoutLogin} />
                : 
                <MobileNavBar logedIn = {props.logedIn} logoutLogin = {logoutLogin} />
                }
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
