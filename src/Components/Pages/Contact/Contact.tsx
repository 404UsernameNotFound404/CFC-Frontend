import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cookie from 'js-cookie'

const axios = require("axios");

const Page = styled.div`
    width: 45em;
    margin: auto;
    margin-top: 10em;
`;

const Title = styled.h1`
    font-size: 5em;
    text-align: left;
`;

const ContactInfo = styled.h4`
    font-size: 2.5em;
    text-align: left;
`;

const ContactInfoContent = styled.span``;

function ContactPage() {
    return (
        <Page>
            <Title>Want to get in touch?</Title>
            <ContactInfo>connecting4changeinfo@gmail.com</ContactInfo>
        </Page>
    )
}

export default ContactPage;