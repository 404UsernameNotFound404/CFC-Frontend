import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SectionOfPage from './SectionOfPage';
import TitleImage from '../../../img/AboutPage/protestPhoto.jpg'
import HenryPhoto from '../../../img/AboutPage/HenryPhoto.jpg'
import DaxtonPhoto from '../../../img/AboutPage/DaxtonPhoto.jpg'
import { useMediaQuery } from 'react-responsive'

const Page = styled.div`
    padding-top: 2.5em;
    width: 65em;
    margin: auto;
    margin-bottom: 4em;
    @media (max-width: 768px) { 
        width: 90%;
    }
`;

const PageTitle = styled.h1`
    font-size: 5em;
    text-align: center;
    font-weight: bolder;
    width: 100%;
    margin: 0.1em;
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

const OrgDescription = styled.p`
    text-align: center;
    width: 90%;
    font-size: 1.5em;
    margin: auto;
`;

const TextContainer = styled.div`
    width: 100%;
    height: fit-content;
    margin: auto;
`;


function AbouPage() {
    const isPhone = useMediaQuery({ minDeviceWidth: 768 })
    return (
        <Page>
            <TitleSection>
                <TextContainer>
                    <PageTitle>About Page</PageTitle>
                    <OrgDescription>This is about creating a website to help connect activists together. We hope to do this by allowing activists to create accounts and learn about groups interested in the same causes. Whether you are just getting involved, or have been an activist for decades, we want to help you change the world.</OrgDescription>
                </TextContainer>
                {isPhone ? <ImageOfUs src={TitleImage} /> : ""}
            </TitleSection>
            <SectionOfPage name={"Henry Morris"} mobile={isPhone} imgSide={true} imgSrc={HenryPhoto} title="Our Vision" para="Connecting for Change was born out of Henry and my desire to continue our activism and help others. We want to provide to activists, some of the support we have had. We also have seen the importance of connecting with others to create change and working together for social justice.<br/>We hope our website can help you find other activists, and help you find groups to get involved with. We are not (yet) a registered non-profit organization, so we pay our hosting fees out of our own pockets. While donations are welcomed, we can not provide charitable tax receipts." />
            <SectionOfPage name={"Daxton Rhead"} mobile={isPhone} imgSide={false} imgSrc={DaxtonPhoto} title="Our Story" para="Henry and I met in elementary school, and became friends through our involvement in activism. This activism began when we learned about unequal funding for schools on and off reserves in Canada, and a campaign called Shannen’s Dream that was trying to fix this. Henry and I went with a few of our peers to talk about Shannen’s Dream with other schools.<br/>We got involved with the First Nations Child and Family Caring Society and continued to learn and speak about reconciliation. Since 2012, we have had the privilege to present to schools, church groups, and conferences, usually alongside our former elementary school teacher, Danielle.<br/>As we grew,, our interest in activism and other areas of injustice, grew. We want to help activists connect and encourage everyone to become involved in campaigns that speak to them. Being involved in social change has not only taught me and Henry about this invaluable work, but it shows us what democracy is supposed to look like.<br/>We have had a lot of help to get our voices heard and want to help elevate the voices of others." />
        </Page>
    );
}

export default AbouPage;
