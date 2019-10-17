import React from 'react';
import styled from 'styled-components';
import MagnifyingGlassImg from '../../../img/magnifyingGlass.svg';

const SearchBarContainer = styled.div`
    width: 75% !important;
    /* width: fit-content; */
    height: 4.5rem;
    margin: auto;
    margin-top: 2em;
    display: flex;
    border: black 0.2em solid;
    border-radius: 1em;
`;

const SearchBarInput = styled.input`
    border: none;
    background-color: transparent;
    font-size: 2em;
    width: 100%;
    /*Give idea that it's on focus for accesability*/
    &:focus {
        outline: none;
    }
`;

const MagnifyingGlass = styled.img`
    margin: auto 1em;
    height: 2em;
    width: 2em;
    color: grey;
    -webkit-filter: invert(0.1); /* Safari 6.0 - 9.0 */
    filter: invert(0.1);
    :hover {
        -webkit-filter: invert(0.25); /* Safari 6.0 - 9.0 */
        filter: invert(0.25);
    }
`;

type Props = {
    value: string,
    changeValue: any,
}

function SearchBar(props: Props) {
    return (
        <SearchBarContainer>
            <MagnifyingGlass src = {MagnifyingGlassImg} />
            <SearchBarInput onChange={props.changeValue} placeholder="Search For An Activist" value={props.value} />
        </SearchBarContainer>
    );
}

export default SearchBar;
