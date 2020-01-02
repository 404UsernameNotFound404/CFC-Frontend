import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SectionOfPage from './SectionOfPage';
import TitleImage from '../../../img/AboutPage/protestPhoto.jpg'
import HenryPhoto from '../../../img/AboutPage/HenryPhoto.jpg'
import DaxtonPhoto from '../../../img/AboutPage/DaxtonPhoto.jpg'
import { useMediaQuery } from 'react-responsive'
import protester from '../../../img/protesterYelling.webp';
import ActivistPage from '../Search/Page';

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
    font-size: 4em;
    font-weight: bolder;
    width: 100%;
    margin: 0;
`;

const TitleSection = styled.div`
    width: 65em;
    display: flex;
    height: 32em;
    margin-top: 2em;
    position: relative;
`;

const ImageOfUs = styled.img`
    width: 20em;
    max-height: 30em;
    border-radius: 0.5em;
`;

const OrgDescription = styled.p`
    width: 100%;
    font-size: 1.6em;
`;

const TextContainer = styled.div`
    width: 100%;
    height: fit-content;
    margin: auto;
`;

type OurStoryImageProps = {
    photo: string
}


const OurStoryImage = styled.div<OurStoryImageProps>`
    width: 32em;
    height: 32em;
    background-image: url(${p => p.photo});
    background-size: cover;
    background-color: red;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 82% 100%);
    position: absolute;
    right: 0;
    top: 0em;
`;

const PhotoOfBothFounders = styled.img`
    width: 90%;
    margin: auto;
    margin-top: 2em;
    height: 25em;
    object-fit: cover;
    border-radius: 0.3em;
    display: block;
`;

const FutureOfOrgPara = styled.p`
    width: 90%;
    font-size: 1.25em;
    margin: 0em auto;
`;

const FutureOfOrgParaTitle = styled.h4`
    font-size: 2.5em;
    margin: 1em;
    margin-left: 5%;
    text-align: center;
`;

const BioTitle = styled.h1`
    font-size: 2.5em;
    text-align: center;
    margin-bottom: 2em;
`;

const BioContainer = styled.div`
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-around;
`;

const TeamMember = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const TeamMemberTitle = styled.h1`
    top: -2em;
    width: 100%;
    position: absolute;
    text-align: center;
`;



function AboutPage() {
    return (
        <Page>
            <TitleSection>
                <TextContainer>
                    <PageTitle>Our Story</PageTitle>
                    <OrgDescription>
                        In 2011, Henry and Daxton first got involved
                        <br />in activism. They learned about past and present
                        <br />injustices facing Indigenous communities, and wanted
                        <br />to take action. They had a lot of support from their teachers,
                        <br />and from groups like the First Nations Child and Family Caring
                        <br />Society. By 2017 both Henry and Daxton were noticing that many
                        <br />people wanted to learn more, and get more involved, but did not have
                        <br />the same support they had received, or did not know how to take action.
                        <br />This is when the idea of Connecting for Change was born. This website’s
                        <br />purpose is to help like-minded people connect and join forces to fight injustice.
                    </OrgDescription>
                </TextContainer>
                <OurStoryImage photo={protester} />
            </TitleSection>
            <PhotoOfBothFounders src={DaxtonPhoto} />
            <FutureOfOrgParaTitle>What the future holds</FutureOfOrgParaTitle>
            <FutureOfOrgPara>
                In 2011, Henry and Daxton first got involved in activism. They learned about past and present injustices facing Indigenous communities, and wanted to take action. They had a lot of support from their teachers, and from groups like the First Nations Child and Family Caring Society. By 2017 both Henry and Daxton were noticing that many
                In 2011, Henry and Daxton first got involved in activism. They learned about past and present injustices facing Indigenous communities, and wanted to take action. They had a lot of support from their teachers, and from groups like the First Nations Child and Family Caring Society. By 2017 both Henry and Daxton were noticing that many
                In 2011, Henry and Daxton first got involved in activism. They learned about past and present injustices facing Indigenous communities, and wanted to take action. They had a lot of support from their teachers, and from groups like the First Nations Child and Family Caring Society. By 2017 both Henry and Daxton were noticing that many
                In 2011, Henry and Daxton first got involved in activism. They learned about past and present injustices facing Indigenous communities, and wanted to take action. They had a lot of support from their teachers, and from groups like the First Nations Child and Family Caring Society. By 2017 both Henry and Daxton were noticing that many
                In 2011, Henry and Daxton first got involved in activism. They learned about past and present injustices facing Indigenous communities, and wanted to take action. They had a lot of support from their teachers, and from groups like the First Nations Child and Family Caring Society. By 2017 both Henry and Daxton were noticing that many
            </FutureOfOrgPara>
            <BioTitle>Our Team</BioTitle>
            <BioContainer>
                <TeamMember>
                    <TeamMemberTitle>Co-Founder</TeamMemberTitle>
                    <ActivistPage width = {"55%"} name={"Henry Morris"} ID={"123"} Categories={[{ Colour: "purple", ID: "0", Name: "Racial Justice" }]} image={HenryPhoto} para={"In 2011, Henry and Daxton first got involved in activism. They learned about past and present injustices facing Indigenous communities, and wanted to take action. They had a lot of support from their teachers, and from groups like the First Nations Child and Family Caring Society. By 2017 both Henry and Daxton were noticing that many"} />
                </TeamMember>
                <TeamMember>
                    <TeamMemberTitle>Co-Founder</TeamMemberTitle>
                    <ActivistPage width = {"55%"} name={"Daxton Rhead"} ID={"123"} Categories={[{ Colour: "purple", ID: "0", Name: "Racial Justice" }]} image={DaxtonPhoto} para={"In 2011, Henry and Daxton first got involved in activism. They learned about past and present injustices facing Indigenous communities, and wanted to take action. They had a lot of support from their teachers, and from groups like the First Nations Child and Family Caring Society. By 2017 both Henry and Daxton were noticing that many"} />
                </TeamMember>
            </BioContainer>
        </Page>
    );
}

export default AboutPage;
