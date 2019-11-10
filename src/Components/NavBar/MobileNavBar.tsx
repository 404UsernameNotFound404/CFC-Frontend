import React, { useState } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'

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

type NavBarPropsMobile = {
    logoutLogin: any
    logedIn: boolean
}

function NavBarMobile(props: NavBarPropsMobile) {
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
    const [mobileOpen, setMobileOpen] = useState(false);
    const changeMobileMenuOpen = (e: any) => {
        console.log(e)
        if (mobileOpen) {
            setMobileOpen(false);
        } else {
            setMobileOpen(true);
        }
    }
    
    return (
        <Menu styles={styles} isOpen={mobileOpen} customOnKeyDown={changeMobileMenuOpen}>
            <LinkTitle to='/home'>Home Page</LinkTitle>
            {props.logedIn ? <LinkTitle to='/edit'>Profile Page</LinkTitle> : ""}
            <LinkTitle to='/about'>About Page</LinkTitle>
            <LinkTitle to='/learn'>Learn About The Issues</LinkTitle>
            <LinkTitle to='/search'><BlueColor>Search For An Activist</BlueColor></LinkTitle>
            <LinkTitle to='/login'><span onClick={props.logoutLogin}>{props.logedIn ? "Logout" : "Login"}</span></LinkTitle>
        </Menu>
    );
}

export default NavBarMobile;
