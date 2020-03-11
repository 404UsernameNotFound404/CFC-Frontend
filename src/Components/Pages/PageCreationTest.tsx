import React from 'react';
import styled from 'styled-components';
import PageCreation from '../ComponentLibrayer/PageCreation/PageCreation';

const Page = styled.div`
    padding-top: 10em;
    width: 75em;
    margin: auto;
`;

function PageCreationTest() {
    return (
        <Page>
            <PageCreation />
        </Page>
    )
}

export default PageCreationTest;