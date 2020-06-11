import React, { useState } from 'react';
import styled from 'styled-components';
import {NavBarItems} from './NavBar';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';

type Props = {
    navBarItems: NavBarItems
}

const Component = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(255,255,255,0.8);
    width: 100vw;
`;

const Content = styled.div`
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    margin-left: 0.75rem;
    height: fit-content;
`;

const HamburgerIcon = styled.h4`
    margin: auto;
    margin-left: auto;
    margin-right: 1.25rem;
    font-size: 1.75rem;
    display: flex;
    justify-content: center;
`;

const LogoTitle = styled(Link)`
    font-size: 1.75rem;
    margin: auto 0;
    font-weight: bolder;
    font-family: 'Big Shoulders Display', cursive;
    font-weight: lighter;
    color: black;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const TitleContent = styled.div`
    display: flex;
`;

type LinksContentProps = {
    closed: boolean;
}

const LinksContent = styled.div<LinksContentProps>`
    width: 100%;
    margin: 0;
    margin-top: 0.5rem;
    height: ${p => p.closed ? "0" : "7.75rem"};
    transition: all 1s ease;
    overflow: hidden;
`;



const LinkStyle = styled(Link)`
    display: block;
    text-align: center;
    width: 100%;
    margin: 0.5rem 0;
    font-size: 1.25rem;
    margin: auto 0.5em;
    text-decoration: none;
    font-weight: bold;
    color: ${p => p.color ? p.color : "black"};
`;

const hamburgerIcon = <FontAwesomeIcon  icon = {faBars} />

function NavBarMobile(props: Props) {
    const [open, setOpen] = useState(false);
    return (
        <Component>
            <Content>
                <TitleContent>
                    <LogoTitle to='/home'>Connecting For Change</LogoTitle>
                    <HamburgerIcon onClick = {() => {setOpen(!open)}}>{hamburgerIcon}</HamburgerIcon>
                </TitleContent>
                <LinksContent closed = {!open}>
                {
                    props.navBarItems.map(ele => <LinkStyle color={ele.color} to = {ele.link} >{ele.name}</LinkStyle>)
                }
                </LinksContent>
            </Content>
        </Component>
    )
}

export default NavBarMobile;