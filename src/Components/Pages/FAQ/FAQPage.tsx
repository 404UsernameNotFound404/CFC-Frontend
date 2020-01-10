import React from 'react'
import styled from 'styled-components'
import Question from './Question'

const Page = styled.div`
    padding-top: 5em;
    margin: auto;
    width: 65em;
`;

const PageTitle = styled.h1`
    font-size: 6em;
    margin: 0;
`;

function FAQPage() {
    return (
        <Page>
            <PageTitle>F.A.Q</PageTitle>
            <Question question = {"Whats your favorite color?"} answer = {"You spelled colour wrong, and buddy the elf whats your favorite color. Figure they will be pretty long usuals so I am makign stuff uop now."} />
            <Question question = {"Whats your favorite color?"} answer = {"You spelled colour wrong, and buddy the elf whats your favorite color. Figure they will be pretty long usuals so I am makign stuff uop now."} />
            <Question question = {"Whats your favorite color?"} answer = {"You spelled colour wrong, and buddy the elf whats your favorite color. Figure they will be pretty long usuals so I am makign stuff uop now."} />
        </Page>
    )
}

export default FAQPage;