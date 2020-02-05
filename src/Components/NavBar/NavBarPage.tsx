import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import { useMediaQuery } from 'react-responsive'
import MobileNavBar from './MobileNavBar'
import DesktopNavBar from './NavBarDesktop'
import { AppContext } from '../../Context/AppContext';
import Cookie from 'js-cookie'

const Container = styled.div`
    top: 0;
    position: fixed;
    width: 100%;
    display: flex;
    z-index: 100;
`;

type NavBarProps = {
    showNavBar: boolean
}



function NavBar(props: NavBarProps) {
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const isPhone = useMediaQuery({ minDeviceWidth: 1000 })
    const c = useContext(AppContext)
   
    useEffect(() => {
        setRedirectToLogin(false);
    }, [props])

    const logoutLogin = () => {
        if (c.loggedIn) {
            console.log("nav bar reset")
            c.setUserToken("")
            Cookie.set("authToken", "")
            c.setLoggedIn(false);
        } else {
            setRedirectToLogin(true);
        }
    }

    if (props.showNavBar) {
        return (
            <Container>
                {redirectToLogin ? <Redirect to='/login' /> : ''}
                {isPhone ? 
                <DesktopNavBar logoutLogin = {logoutLogin} />
                : 
                <MobileNavBar logoutLogin = {logoutLogin} />
                }
            </Container>
        );
    } else {
        return <div></div>
    }
}

export default NavBar;
