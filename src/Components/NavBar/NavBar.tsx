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
    var styles = {
        bmBurgerButton: {
          position: 'fixed',
          width: '36px',
          height: '30px',
          left: '36px',
          top: '36px'
        },
        bmBurgerBars: {
          background: '#373a47'
        },
        bmBurgerBarsHover: {
          background: '#a90000'
        },
        bmCrossButton: {
          height: '24px',
          width: '24px'
        },
        bmCross: {
          background: '#bdc3c7'
        },
        bmMenuWrap: {
          position: 'fixed',
          height: '100%'
        },
        bmMenu: {
          background: '#373a47',
          padding: '2.5em 1.5em 0',
          fontSize: '1.15em'
        },
        bmMorphShape: {
          fill: '#373a47'
        },
        bmItemList: {
          color: '#b8b7ad',
          padding: '0.8em'
        },
        bmItem: {
          display: 'inline-block'
        },
        bmOverlay: {
          background: 'rgba(0, 0, 0, 0.3)'
        }
    }
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const isPhone = useMediaQuery({ minDeviceWidth: 768 })
    const logoutLogin = () => {
        if (props.logedIn) {
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
                {isPhone ? 
                <Content>
                    <LogoTitle to='/home'>Connecting For Change</LogoTitle>
                    <RightPart>
                        {props.logedIn ? <LinkTitle to='/edit'>Profile Page</LinkTitle> : ""}
                        <LinkTitle to='/about'>About Page</LinkTitle>
                        <LinkTitle to='/learn'>Learn About The Issues</LinkTitle>
                        <LinkTitle to='/search'><BlueColor>Search For An Activist</BlueColor></LinkTitle>
                        <LinkTitle to='/login'><span onClick={logoutLogin}>{props.logedIn ? "Logout" : "Login"}</span></LinkTitle>
                    </RightPart>
                </Content>
                : 
                <Menu styles = {styles}>
                     <LinkTitle to='/home'>Home Page</LinkTitle>
                    {props.logedIn ? <LinkTitle to='/edit'>Profile Page</LinkTitle> : ""}
                    <LinkTitle to='/about'>About Page</LinkTitle>
                    <LinkTitle to='/learn'>Learn About The Issues</LinkTitle>
                    <LinkTitle to='/search'><BlueColor>Search For An Activist</BlueColor></LinkTitle>
                    <LinkTitle to='/login'><span onClick={logoutLogin}>{props.logedIn ? "Logout" : "Login"}</span></LinkTitle>
                </Menu>
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
