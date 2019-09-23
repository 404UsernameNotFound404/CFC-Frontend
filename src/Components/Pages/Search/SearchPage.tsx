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
    height: 85vh;
    /* background-image: url(${PeopleTalking}); */
    background-size: 100%;
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


function LinksContainer() {
    const [searchValue, setSearchValue] = useState('');

    const updateSearchBar = (event: any) => {
        console.log('update value');
        setSearchValue(event.target.value);
    }

    return (
        <PageContainer>
            <SearchForWhat Title = "Events" />
            {/* <TopPartPage>
                <TopPartContent>
                    <SearchBarContainer>
                        <SearchBar changeValue={updateSearchBar} value={searchValue} />
                    </SearchBarContainer>
                    <CategorySearch text={'asd'} />
                </TopPartContent>
            </TopPartPage>
            <SearchResults WhatWasSearched={'asd'} /> */}
        </PageContainer>
    );
}

export default LinksContainer;
