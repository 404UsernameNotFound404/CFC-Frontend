import React, { useState } from 'react';
import styled from 'styled-components';
import Protest from '../../../img/Protest.jpg';
import SearchBar from './SearchBar';
import PeopleTalking from '../../../img/Protest.jpg';
import SearchResults from './SearchResults';
import CategorySearch from './CategorySearch';

const Content = styled.div`
    width: 30%;
    height: 20em;
    margin: auto;
`;

const Title = styled.h1`
    margin: 0 0.25em;
    font-size: 1.25em;
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
