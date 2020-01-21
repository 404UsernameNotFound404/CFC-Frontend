import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";

const Component = styled.div`
    width: fit-content;
    height: 100%;
    margin: 0 0.5em;
`;

const Title = styled(Link)`
    font-size: 1.25em;
    margin: auto 0;
    line-height: 2.5rem;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    cursor: pointer;
    color: black;
    font-weight: bold;

`;

const MenuOptions = styled.div`
    background-color: rgba(255,255,255,0.8);
    border-top: none;
    position: absolute;
    display: block;
    margin-top: -0.25em;
`;

const OptionContainer = styled.div`
    width: 5em;
    margin-bottom: 0.5em;
`;

const LinkTitle = styled(Link)`
    font-size: 1.1em;
    margin: auto 0;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    cursor: pointer;
    color: black;
    font-weight: bold;
`;

type DropDownProps = {
    loggedIn: boolean,
    logoutLogin: any
}

function ProfileDropDown(props: DropDownProps) {
    const [hovering, setHovering] = useState(false);
    return (
        <Component onMouseEnter={() => { setHovering(true) }} onMouseLeave={() => { setHovering(false) }}>
            <Title to='/profile'>Profile</Title>
            {hovering ?
                <MenuOptions>
                    <OptionContainer><LinkTitle to='/login'><span onClick={props.logoutLogin}>{props.loggedIn ? "Logout" : "Login"}</span></LinkTitle></OptionContainer>
                </MenuOptions>
                : ""
            }
        </Component>
    );
}

export default ProfileDropDown;
