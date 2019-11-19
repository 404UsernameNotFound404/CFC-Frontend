import React from 'react';
import styled from 'styled-components';
import ResultsContainer from './ResultsContainer';

const Container = styled.div`
    width: 75em !important;
    height: fit-content;
    margin: auto;
    padding-bottom: 2em;
    @media (max-width: 768px) { 
        width: 100% !important;
    }
`;

const WhatIsSearch = styled.h1`
    width: 100%;
    font-size: 1.5em;
`;

type Props = {
    WhatWasSearched: string,
    categoriesToNotAllow: any
}

function SearchBar(props: Props) {
    return (
        <Container>
            {/* <WhatIsSearch>Results of search</WhatIsSearch> */}
            <ResultsContainer categoriesToNotAllow = {props.categoriesToNotAllow} text={'asd'} />
        </Container>
    );
}

export default SearchBar;
