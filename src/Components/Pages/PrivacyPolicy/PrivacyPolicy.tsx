import React from 'react';
import styled from 'styled-components'

const Page = styled.div`
    width: 75em;
    padding-top: 5em;
    padding-left: 5em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        width: 100%;
    }
`;

const Title = styled.h1`
    font-size: 2em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        font-size: 1.5em;
    }
`;

const Para = styled.p`
`;

const Contact = styled.h4`
    color: grey;
`;

const ContactInfo = styled.span`
    color: black;
`;

function PrivacyPolicy() {
    return (
        <Page>
            <Title>Privacy Policy</Title>
            <Para>
                We only collect the data you input to us. E.X when you register you give use your email and potential your phone. When you delete your account we don’t save your information for any time period.
            </Para>
            <Para>
                If you are concerned and would like to get in contact.
            </Para>
            <Contact>Email: <ContactInfo>connecting4changeinfo@gmail.com</ContactInfo></Contact>
            <Contact>Phone Number: <ContactInfo>613-223-3911</ContactInfo></Contact>
        </Page>
    )
}

export default PrivacyPolicy;