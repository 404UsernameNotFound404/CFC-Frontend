import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'
import { AppContext } from '../../Context/AppContext';

type LinkTitleProps = {
    color: string,
    marginRight: string
}

const LinkTitle = styled(Link)<LinkTitleProps>`
    font-size: 1.25em;
    margin: 0 0.5em;
    margin-top: auto;
    margin-left: ${p => p.marginRight};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    cursor: pointer;
    color: ${p => p.color};
    width: 100%;
    font-weight: bold;
    white-space: nowrap;
`;

type NavBarPropsMobile = {
    logoutLogin: any
}

function NavBarMobile(props: NavBarPropsMobile) {
    const styles = {
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
    const c = useContext(AppContext)
    
    return (
        <Menu styles={styles} isOpen={mobileOpen} customOnKeyDown={changeMobileMenuOpen}>
            <LinkTitle marginRight = {"0"} color = {"black"} to='/home'>Home Page</LinkTitle>
            {c.loggedIn ? <LinkTitle marginRight = {"0"} color = {"black"} to='/edit'>{(c.userType == 0) ? "Edit Your Page" : "Edit Organization Information"}</LinkTitle> : ""}
            <LinkTitle marginRight = {"0"} color = {"black"} to='/about'>About</LinkTitle>
            <LinkTitle marginRight = {"0"} color = {"black"} to='/FAQ'>F.A.Q.</LinkTitle>
            <LinkTitle marginRight = {"0"} color = {"black"} to='/learn'>Learn About The Issues</LinkTitle>
            <LinkTitle marginRight = {"0"} color = {"#3c78d8"} to='/search'>Find An Organization</LinkTitle>
        </Menu>
    );
}

export default NavBarMobile;