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
    color: #3c78d8;
    font-weight: bold;

`;

const MenuOptions = styled.div`
    background-color: rgba(255,255,255,0.8);
    border-top: none;
    position: absolute;
    display: block;
    margin-top: -0.25em;
`;

const Option = styled(Link)`
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

const OptionContainer = styled.div`
    width: 5em;
    margin-bottom: 0.5em;
`;
type DropDownProps = {
    options: {name: string, link: string}[]
    title: string
}

function DropDown(props: DropDownProps) {
    const [hovering, setHovering] = useState(false);
    return (
        <Component  onMouseEnter = {() => {setHovering(true)}} onMouseLeave = {() => {setHovering(false)}}>
            <Title to = '/search'>{props.title}</Title>
            {hovering ?
                <MenuOptions>
                    { 
                        props.options.map(ele => {
                            return <OptionContainer><Option to = {ele.link}>{ele.name}</Option></OptionContainer>
                        })
                       
                    }
                </MenuOptions>
                 : ""
            }
        </Component>
    );
}

export default DropDown;
