import React from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";


const Component = styled(Link)`
    width: 28%;
    height: 20em;
    background-color: #3c78d8;
    margin: 0 10%;
    display: flex;
    justify-content: center;
    border-radius: 1em;
    text-decoration: none;
    &:hover {
        background-color: #1c6ceb;
    }
    @media (max-width: 768px) { 
        width: 75%;
        height: 15em;
        margin: 2em auto;
    }
`;

const Text = styled.h1`
    font-size: 2.5em;
    margin: auto;
    text-align: center;
    color: white;
`;

type Props = {
    link: string,
    text: string
}

function SearchBar(props: Props) {
        return (
            <Component to = {props.link}>
                <Text>{props.text}</Text>
            </Component>
        )
}

export default SearchBar;
