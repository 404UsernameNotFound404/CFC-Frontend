import React from 'react'
import styled from 'styled-components'
import Question from './Question'

const Page = styled.div`
    padding-top: 5em;
    margin: auto;
    margin-bottom: 3em;
    width: 65em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        width: 90%;
        margin: auto;
    }
`;

const PageTitle = styled.h1`
    font-family: 'Scope One', serif;
    font-size: 4em;
    margin: 0;
`;

function FAQPage() {
    const faqs = [
        { question: "Do I have to already be an activist?", answer: "No, everyone has to start somewhere. We want to help you get involved in activism." },
        { question: "Do I have to create an account?", answer: "No, however for our activists safety you do need an account to see their information. Everything else on the website is visible without an account." },
        { question: "Do you share my email address with anyone?", answer: "No." },
        { question: "Is Connecting For Change a grassroots organization?", answer: "Yes." },
        { question: "Can you make my profile only visible to some people?", answer: "Only people with accounts can see your activist profile." },
        { question: "How can I submit feedback?", answer: "Please email us. Our email is admin@connecting-for-change.ca" },
        { question: "Is Connecting For Change affiliated with a political party?", answer: "No. Connecting For Change is about social/environmental justice and human rights." },
        { question: "How can I get involved with Connecting For Change?", answer: "Please reach out to us at: admin@connecting-for-change.ca" }
    ]
    return (
        <Page>
            <PageTitle>Frequently Asked Questions</PageTitle>
            {
                faqs.map((ele, i) => <Question question={ele.question} answer={ele.answer} key={i} />)
            }
        </Page>
    )
}

export default FAQPage;