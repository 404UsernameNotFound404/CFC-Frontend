import React from 'react';
import styled from 'styled-components';
import LogoImg from '../../img/placeholder.png';
import {
    BrowserRouter as Router,
    Link
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

const LogoTitle = styled.h1`
    font-size: 2em;
    margin: 0;
    margin-top: auto;
    font-weight: bolder;
    /* color: white; */
    font-family: 'Big Shoulders Display', cursive;
    font-weight: lighter;
`;

const LinkTitle = styled(Link)`
    font-size: 1.5em;
    margin: 0 1em;
    margin-top: auto;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    cursor: pointer;
    color: black;
    font-weight: bold;
`;

const SearchForActivist = styled(Link)`
    margin: 0;
    margin-top: auto;
    cursor: pointer;
    font-size: 1.5em;
    color: #3c78d8;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    font-weight: bold;
`;

const Content = styled.div`
    width: 75em;
    margin: auto;
    height: 2.5em;
    display: flex;
`;

type NavBarProps = {
    login: Function
}

function NavBar(props: NavBarProps) {
    const logout = () => {
        props.login({JWTToken: ""})
    }

    return (
        <Container>
            <Content>
                <LogoTitle>Connecting For Change</LogoTitle>
                <RightPart>
                    <LinkTitle to = '/home'>Blog</LinkTitle>
                    <SearchForActivist to = '/search'>Search For A Activist</SearchForActivist>
                    <LinkTitle to = '/login'><span onClick = {logout}>Logout</span></LinkTitle>
                </RightPart>
            </Content>
        </Container>
    );
}


const mapStateToProps = (state: any) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatchMethod: any) => {
    return {
        login: (loginInfo: any) => { dispatchMethod({type: 'LOGIN', loginInfo: loginInfo})}
    }
  }
   
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
