import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";
import DropDown from '../../NavBar/DropDownMenu';
import { AppContext } from '../../../Context/AppContext';
import {NavBarItems} from './NavBar';

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

type LinkTitleProps = {
    color?: string
}

const LinkTitle = styled(Link)<LinkTitleProps>`
    font-size: 1.25em;
    margin: auto 0.5em;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    cursor: pointer;
    color: ${p => p.color ? p.color : "black"};
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
    top: 0;
    position: fixed;
    display: flex;
    z-index: 100;
    width: 100%;
    height: fit-content;
    background-color: rgba(255,255,255,0.8);
`;

type Props = {
    navBarItems: NavBarItems
}

function NavBarDesktop(props: Props) {
    const c = useContext(AppContext)
    const thingsToSearch = [
        // { name: "Events", link: "/search?search=Events" },
        { name: "Activists", link: "/search?search=Activists" },
        { name: "Organizations", link: "/search?search=Organizations" }
    ]
    return (
        <LightOverlay>
            {console.log("THIS RENDERING")}
            <Content>
                <LogoTitle to='/home'>Connecting For Change</LogoTitle>
                <RightPart>
                    {
                        props.navBarItems.map((ele, i) => <LinkTitle key={i} color={ele.color} to = {ele.link}>{ele.name}</LinkTitle>)
                    }
                </RightPart>
            </Content>
        </LightOverlay>
    );
}

export default NavBarDesktop;
