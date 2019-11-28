import React, { useState } from 'react';
import styled from 'styled-components';

const Content = styled.div`
    width: 40%;
    height: 20em;
    margin: auto;
    background-color: #a4c2f4;
    border-radius: 0.5em;
    display: flex;
    justify-content: center;
`;

const Title = styled.h1`
    margin: auto;
    height: fit-content;
    font-size: 3em;
    text-align: center;
    color: black;
`;

type Props = {
    Title: string
}

function SearchForWhat(props: Props) {
    return (
        <Content>
            <Title>{props.Title}</Title>
        </Content>
    );
}

export default SearchForWhat;
