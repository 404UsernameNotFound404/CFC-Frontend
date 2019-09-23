import React from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.div`
    width: 90% !important;
    width: fit-content;
    height: 4.5rem;
    margin: auto;
    margin-top: 2em;
    display: flex;
`;

const SearchBarInput = styled.input`
    border: solid black thin;
    font-size: 2em;
    padding: 0.25rem 1%;
    width: 83%;
    height: 4rem;
    margin: 0;
    border-radius: 0.5rem 0 0 0.5rem;
    /*Give idea that it's on focus for accesability*/
    &:focus {
        outline: none;
    }
`;

const SearchBarSearcButton = styled.div`
    cursor: pointer;
    height: 100%;
    width: 15%;
    background-color: white;
    border-top: black thin solid;
    border-bottom: black thin solid;
    border-right: black thin solid;
    border-radius: 0 0.5rem 0.5rem 0;
    display: flex;
    justify-content: center;
    font-size: 0.75em;
    &:hover {
        background-color: rgb(230,230,230);
    }
`;

const SearchBarSearcButtonText = styled.h1`
    margin: auto;
    width: fit-content;
    height: fit-content;
`;

type Props = {
    value: string,
    changeValue: any,
}

function SearchBar(props: Props) {
    return (
        <SearchBarContainer>
            <SearchBarInput onChange={props.changeValue} placeholder="Search For Activist" value={props.value} />
            <SearchBarSearcButton><SearchBarSearcButtonText>Search</SearchBarSearcButtonText></SearchBarSearcButton>
        </SearchBarContainer>
    );
}

export default SearchBar;
