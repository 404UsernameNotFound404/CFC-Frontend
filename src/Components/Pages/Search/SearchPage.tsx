import React, { useState } from 'react';
import styled from 'styled-components';
import Protest from '../../../img/Protest.jpg';
import SearchBar from './SearchBar';
import PeopleTalking from '../../../img/Protest.jpg';
import SearchResults from './SearchResults';
import CategorySearch from './CategorySearch';
import SearchForWhat from './SearchForWhat';

const PageContainer = styled.div`
    padding-top: 2.5em;
    width: 75em;
    margin: auto;
`;

const TopPartPage = styled.div`
    padding-top: 15vh;
    padding-bottom: 7.5vh;
    width: 100%;
`;

const BlackOverlay = styled.div`
    background-color: rgba(0,0,0,0.25);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const TopPartContent = styled.div`
    width: 100%;
    height: fit-content;
    margin: auto;
`;
const SearchBarContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const SearchForWhatPage = styled.div `
    width: 75em;
    height: 100vh;
    margin: auto;
    display: flex;
    justify-content: center;
`;

const SearchForWhatContainer = styled.div`
    margin-top: 4em;
    width: 75%;
    display: flex;
    justify-content: space-between;
`;

const SearchForWhatTitle = styled.h1 `
    font-size: 4em;
    position: absolute;
    top: 10vh;
`;

const OR = styled.h1`
    font-size: 3em;
    margin: auto;
`;

const SearchBoxTitle = styled.h1 `
    font-size: 4em;
    margin: 0;
    text-align: center;
`;


function LinksContainer() {
    const [searchValue, setSearchValue] = useState('');

    const updateSearchBar = (event: any) => {
        console.log('update value');
        setSearchValue(event.target.value);
    }

    if(false) {
        return (
            <SearchForWhatPage>
                <SearchForWhatTitle>What would you like to search for?</SearchForWhatTitle>
                <SearchForWhatContainer>
                    <SearchForWhat Title = "Events" />
                    <OR>or</OR>
                    <SearchForWhat Title = "Activists" />
                </SearchForWhatContainer>
            </SearchForWhatPage>
        );
    } else {
        return (
            <PageContainer>
                <TopPartPage>
                    <SearchBoxTitle>Who are you looking for?</SearchBoxTitle>
                    <SearchBar changeValue={updateSearchBar} value={searchValue} />
                    <CategorySearch text={'asd'} />
                </TopPartPage>
                <SearchResults WhatWasSearched={'asd'} />
            </PageContainer>
        );
    }
}

export default LinksContainer;
