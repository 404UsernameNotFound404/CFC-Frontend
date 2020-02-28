import React from 'react'
import styled from 'styled-components'
import Question from './Question'

const Page = styled.div`
    padding-top: 5em;
    margin: auto;
    width: 65em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        width: 90%;
        margin: auto;
    }
`;

const PageTitle = styled.h1`
    font-size: 6em;
    margin: 0;
`;

function FAQPage() {
    const faqs = [
        { question: "Do I have to already be an activist?", answer: "No, everyone has to start somewhere. We want to help you get involved in activism." },
        { question: "Do I have to create an account?", answer: "No, you can create an account if you want to have a profile on Connecting For Change, but this by no means necessary." },
        { question: "Do you share my email address with anyone?", answer: "No. However, we may ask for permission in the future to send you things you would be interested." },
        { question: "Is Connecting For Change a grassroots organization?", answer: "Yes. It is founded and run by Henry and Daxton two activists." },
        { question: "Can you make my profile only visible to some people?", answer: "This is not possible at the moment, but if you would like to see this feature please send us some feedback." },
        { question: "How can I submit feedback?", answer: "Please email us. Our email is connecting4changeinfo@gmail.com" },
        { question: "Is Connecting For Change affiliated with a political party?", answer: "No. Connecting For Change is about social/environmental justice and human rights." },
        { question: "How can I get involved with Connecting For Change?", answer: "Please reach out to us at: connecting4changeinfo@gmail.com" }
    ]
    return (
        <Page>
            <PageTitle>F.A.Q.</PageTitle>
            {
                faqs.map((ele, i) => <Question question={ele.question} answer={ele.answer} key={i} />)
            }
        </Page>
    )
}

export default FAQPage;