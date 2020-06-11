import React from 'react';
import { useMediaQuery } from 'react-responsive';
import NavBarDesktop from './NavBarDesktop';
import NavBarMobile from './NavBarMobile';

export type NavBarItems = {
    name: string;
    link: string;
    color?: string;
}[];

function NavBar() {
    const isPhone = useMediaQuery({ minDeviceWidth: parseInt(process.env.REACT_APP_PHONE_BREAK) });
    const navBarItems = [
        {name: "Contact Us", link: "contact"},
        {name: "About Page", link: "about"},
        {name: "F.A.Q.", link: "FAQ"},
        {name: "Learn About The Issues", link: "learn"},
        {name: "Find An Organization", link: "search", color: "#0c449f"}
    ];
    return (
        <>
            {
                !isPhone ? <NavBarMobile navBarItems={navBarItems} /> : <NavBarDesktop navBarItems={navBarItems} />
            }
        </>
    )
}

export default NavBar;