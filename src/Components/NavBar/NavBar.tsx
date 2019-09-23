import React from 'react';
import styled from 'styled-components';
import LogoImg from '../../img/placeholder.png';

const Container = styled.div`
    top: 0;
    position: fixed;
    width: 100%;
    display: flex;
    padding: 0.5em 0.25em;
    z-index: 100;
`;

const RightPart = styled.div`
    margin-left: auto;
    display: flex;
`;

const LogoTitle = styled.h1`
    font-size: 2em;
    margin: 0;
    margin-top: auto;
    font-weight: bolder;
    /* color: white; */
`;

const LinkTitle = styled.h1`
    font-size: 1.25em;
    margin: 0 1em;
    margin-top: auto;
    &:hover {
        text-decoration: underline;
    }
    cursor: pointer;
`;

const SearchForActivist = styled.h1`
    margin: 0;
    margin-top: auto;
    cursor: pointer;
    font-size: 1.25em;
    color: #3c78d8;
    &:hover {
        text-decoration: underline;
    }
`;

const Content = styled.div`
    width: 75em;
    margin: auto;
    height: 2.5em;
    display: flex;
`;

function App() {
    return (
        <Container>
            <Content>
                <LogoTitle>Connecting For Change</LogoTitle>
                <RightPart>
                    <LinkTitle>Blog</LinkTitle>
                    <SearchForActivist>Search For A Activist</SearchForActivist>
                    <LinkTitle>Login</LinkTitle>
                </RightPart>
            </Content>
        </Container>
    );
}

export default App;
