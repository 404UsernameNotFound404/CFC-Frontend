import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SectionOfPage from './SectionOfPage';
import TitleImage from '../../../img/protestPhoto.jpg'

const Page = styled.div`
    padding-top: 2.5em;
    width: 65em;
    margin: auto;
    margin-bottom: 4em;
`;

const PageTitle = styled.h1`
    font-size: 5em;
    text-align: center;
    font-weight: bolder;
    width: 75%;
    height: 100%;
    margin: auto;
`;

const TitleSection = styled.div`
    width: 100%;
    display: flex;
    margin-top: 2em;
`;

const ImageOfUs = styled.img`
    width: 20em;
    max-height: 30em;
    border-radius: 0.5em;
`;

function AbouPage() {
        return (
            <Page>
                <TitleSection>
                    <PageTitle>About Page</PageTitle>
                    <ImageOfUs src = {TitleImage} />
                </TitleSection>
                <SectionOfPage imgSide = {true} imgSrc = {TitleImage} title = "Our Vision" para = "Connecting for Change was born out of Henry and my desire to continue our activism and help others. We want to provide to activists, some of the support we have had. We also have seen the importance of connecting with others to create change and working together for social justice.<br/>We hope our website can help you find other activists, and help you find groups to get involved with. We are not (yet) a registered non-profit organization, so we pay our hosting fees out of our own pockets. While donations are welcomed, we can not provide charitable tax receipts." />
                <SectionOfPage imgSide = {false} imgSrc = {TitleImage} title = "Our Story" para = "Henry and I met in elementary school, and became friends through our involvement in activism. This activism began when we learned about unequal funding for schools on and off reserves in Canada, and a campaign called Shannen’s Dream that was trying to fix this. Henry and I went with a few of our peers to talk about Shannen’s Dream with other schools.<br/>We got involved with the First Nations Child and Family Caring Society and continued to learn and speak about reconciliation. Since 2012, we have had the privilege to present to schools, church groups, and conferences, usually alongside our former elementary school teacher, Danielle.<br/>As we grew,, our interest in activism and other areas of injustice, grew. We want to help activists connect and encourage everyone to become involved in campaigns that speak to them. Being involved in social change has not only taught me and Henry about this invaluable work, but it shows us what democracy is supposed to look like.<br/>We have had a lot of help to get our voices heard and want to help elevate the voices of others." />
            </Page>
        );
    }

export default AbouPage;
