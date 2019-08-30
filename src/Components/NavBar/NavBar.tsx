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

const Logo = styled.img`
    width: 10em;
    height: 5em;
`;

const LeftPart = styled.div`
    display: flex;
`;

const RightPart = styled.div`
    margin-left: auto;
    display: flex;
`;

const LogoTitle = styled.h1`
    font-size: 2em;
    margin: auto 0;
    font-weight: bolder;
    color: white;
`;

const LinkTitle = styled.h1`
    font-size: 1em;
    margin: auto 1em;
    color: white;
    &:hover {
        text-decoration: underline;
    }
    cursor: pointer;
`;

const SearchForActivist = styled.div`
    margin: auto 0;
    cursor: pointer;
    border: white 0.075em solid;
    border-radius: 0.2em;
    color: white;
    padding: 0.2em 0.75em;
    font-size: 1.25em;
    &:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

function App() {
    return (
        <Container>
            <LeftPart>
                {/* <Logo src={LogoImg} /> */}
                <LogoTitle>Connecting For Change</LogoTitle>
                <LinkTitle>Learn How To Beome A Activits</LinkTitle>
                <LinkTitle>Blog</LinkTitle>
            </LeftPart>
            <RightPart>
                <SearchForActivist>Search For A Activist</SearchForActivist>
                <LinkTitle>Login</LinkTitle>
            </RightPart>
        </Container>
    );
}

export default App;
