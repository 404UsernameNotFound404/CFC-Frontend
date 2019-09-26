import React, { useState }from 'react';
import styled from 'styled-components';
import BasicButton from '../../ComponentLibrayer/BasicButton';

const Content = styled.div`
    width: 40%;
    margin: 3em auto;
    height: fit-content;
    padding: 0 2%;
    padding-top: 1.5%;
    padding-bottom: 0%;
    /* -webkit-box-shadow: 5px 5px 15px 5px rgba(176, 176, 176, 0.81);
    box-shadow: 5px 5px 15px 5px rgba(176, 176, 176, 0.81); */
    /* border: lightgray thin solid; */
    border-radius: 1em;
`;

const LoginTitle = styled.h1`
    font-size: 0.75em;
    color: grey;
    margin: 0;
`;

const LoginInput = styled.input`
    width: 100%;
    margin: 0.5em auto;
    padding: 0.5em 0.25em;
    font-size: 1em;
    border: none;
    background-color: transparent;
    border-bottom: thin solid grey;
    &:focus {
        outline: none;
    }
`;

const BreakLine = styled.div`
    margin: 0;
    margin-bottom: 1em;
    margin-left: -2%;
    width: 104%;
    height: 0.1em;
    /* background-color: grey; */
`;

type Props = {
    
}

function Activst(props: Props) {
    return (
        <Content>
            {/* <LoginTitle>Email</LoginTitle> */}
            <LoginInput placeholder = "Email Address" />
            <BreakLine />
            {/* <LoginTitle>Password</LoginTitle> */}
            <LoginInput placeholder = "********" type = 'password' />
        </Content>
    );
}

export default Activst;
