import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import testIds from './testIds';
import NavBarMobile from '../NavBarMobile';
import {
    BrowserRouter as Router,
} from "react-router-dom";

const navBarItems = [
    { name: "Contact Us", link: "contact" },
    { name: "About Page", link: "about" },
    { name: "F.A.Q.", link: "FAQ" },
    { name: "Learn About The Issues", link: "learn" },
    { name: "Find An Organization", link: "search", color: "#0c449f" }
];

describe("NavBarMobile", () => {
    test("Make sure it renders", () => {
        const { queryByTestId } = render(
            <Router>
                <NavBarMobile navBarItems={navBarItems} />
            </Router>
        );

        const container = queryByTestId(testIds.mobile.container);
        expect(container).not.toBeNull();

        const openButton = queryByTestId(testIds.mobile.openButton);
        expect(openButton).not.toBeNull();

        const links = queryByTestId(testIds.mobile.links);
        const style = window.getComputedStyle(links);
        expect(style.height).toEqual("0px")
    });

    test("if menu links open when open button clicked", () => {
        const { queryByTestId } = render(
            <Router>
                <NavBarMobile navBarItems={navBarItems} />
            </Router>
        );

        const linksBefore = queryByTestId(testIds.mobile.links);
        const styleBefore = window.getComputedStyle(linksBefore);
        expect(styleBefore.height).toEqual("0px")

        const openButton = queryByTestId(testIds.mobile.openButton);
        fireEvent.click(openButton);

        const linksAfter = queryByTestId(testIds.mobile.links);
        const styleAfter = window.getComputedStyle(linksAfter);
        expect(styleAfter.height).toEqual("7.75rem")
    });
})