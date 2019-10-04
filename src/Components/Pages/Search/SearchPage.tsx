import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import CategorySearch from './CategorySearch';
import SearchForWhat from './SearchForWhat';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import rootReducer from '../../../Reducers/searchPageReducer';

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

    const store = createStore(rootReducer);

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
            <Provider store = {store}>
                <PageContainer>
                    <TopPartPage>
                        <SearchBoxTitle>Who are you looking for?</SearchBoxTitle>
                        <SearchBar changeValue={updateSearchBar} value={searchValue} />
                        <CategorySearch text={'asd'} />
                    </TopPartPage>
                    <SearchResults WhatWasSearched={'asd'} />
                </PageContainer>
            </Provider>
        );
    }
}

const mapStateToProps = (state: any) => {
    return {
      searchBar: state.searchBar
    }
  }
  export default connect(mapStateToProps)(LinksContainer);
