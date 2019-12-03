import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";

const Component = styled.div`
    width: 100%;
    height: fit-content;
    background-color: rgba(255,255,255,0.8);
`;

type NavBarDekstopProps = {
    logoutLogin: any
}

function NavBarDesktop(props: NavBarDekstopProps) {
    const [redirectToHome, setRedirectToHome] = useState(false)
    return (
        <Component>
            {redirectToHome ? <Redirect to = "/home" /> : ""}
            
        </Component>
    );
}

export default NavBarDesktop;
