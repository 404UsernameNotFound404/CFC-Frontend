import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { getSearchData } from '../../packages/search-page-functions/getSearchData';
import { AppContext } from '../../../Context/AppContext';

const Component = styled.div`
`;

type Props = {
    categoriesToShow: number[];
}

function Activists(props: Props) {
    const c = useContext(AppContext)

    return (
        <Component>
        </Component>
    );
}

export default Activists;