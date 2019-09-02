import React from 'react';
import styled from 'styled-components';

import Activst from './Activst';

import DDog from '../../../img/DDOG.jpg';

const Container = styled.div`
    width: 90% !important;
    width: fit-content;
    margin: auto;
    display: flex;
`;

type Props = {
    text: string
}

function SearchBar(props: Props) {
    return (
        <Container>
            <Activst name={'Daxton Rhead'} img={DDog} para={'para'} />
        </Container>
    );
}

export default SearchBar;
