import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SectionOfPage from './SectionOfPage';
import TitleImage from '../../../img/AboutPage/protestPhoto.jpg'
import HenryPhoto from '../../../img/AboutPage/HenryPhoto.jpg'
import DaxtonPhoto from '../../../img/AboutPage/DaxtonPhoto.jpg'
import { useMediaQuery } from 'react-responsive'
import protester from '../../../img/protesterYelling.webp';
import ActivistPage from '../Search/Page';
import SlideContainer from './SlidesComponents/SlideContainer';
import FirstSlide from './SlidesComponents/FirstSlide';
import SecondSlide from './SlidesComponents/SecondSlide';
import ThirdSlide from './SlidesComponents/ThirdSlide';
import PhotoOfFounders from '../../../img/BothOfUsPhoto.jpg'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css'
import TeamSection from './TeamSection';

const Page = styled.div`
    padding-top: 45em;
    width: 65rem;
    margin: auto;
    margin-bottom: 4em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 90%;
    }
`;

const PageTitle = styled.h1`
    font-size: 4em;
    font-weight: bolder;
    width: 65rem;
    margin: auto;
    margin-bottom: 0.5em;
`;

const TitleSection = styled.div`
    position: absolute;
    width: 100%;
    height: 40em;
    margin-top: 2em;
    overflow-x: hidden;
    left: 0;
    top: 2.25em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        height: 55em;
    }
`;

const PhotoOfBothFounders = styled.img`
    width: 90%;
    margin: auto;
    margin-top: 2em;
    height: 25em;
    object-fit: cover;
    object-position: top;
    border-radius: 0.3em;
    display: block;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        margin-top: 4em;
        height: 15em;
    }
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
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        display: block;
    }
`;

const TeamMember = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        height: fit-content;
        margin-bottom: 2.5em;
    }
`;

const TeamMemberTitle = styled.h1`
    top: -2em;
    width: 100%;
    position: absolute;
    text-align: center;
`;

function AboutPage() {
    const isPhone = useMediaQuery({ minDeviceWidth: 1000 })
    const responsive = { 0: { items: 1 } };
    // @ts-ignore: Unreachable code error
    return (
        <Page>
            <TitleSection>
                <PageTitle>Our Story</PageTitle>
                {isPhone ?
                    <SlideContainer width="65em">
                        <FirstSlide />
                        <SecondSlide />
                        <ThirdSlide />
                    </SlideContainer>
                    :
                    <AliceCarousel infinite = {false} responsive = {responsive} onInitialized = {() => {console.log('asd')}} mouseTrackingEnabled buttonsDisabled={true} dotsDisabled={false} touchTrackingEnabled>
                        <FirstSlide />
                        <SecondSlide />
                        <ThirdSlide />
                    </AliceCarousel>
                }
            </TitleSection>
            <PhotoOfBothFounders src={PhotoOfFounders} />
            <FutureOfOrgParaTitle>What the future holds</FutureOfOrgParaTitle>
            <FutureOfOrgPara>
                In 2011, Henry and Daxton first got involved in activism. They learned about past and present injustices facing Indigenous communities, and wanted to take action. They had a lot of support from their teachers, and from groups like the First Nations Child and Family Caring Society. By 2017 both Henry and Daxton were noticing that many
                In 2011, Henry and Daxton first got involved in activism. They learned about past and present injustices facing Indigenous communities, and wanted to take action. They had a lot of support from their teachers, and from groups like the First Nations Child and Family Caring Society. By 2017 both Henry and Daxton were noticing that many
                In 2011, Henry and Daxton first got involved in activism. They learned about past and present injustices facing Indigenous communities, and wanted to take action. They had a lot of support from their teachers, and from groups like the First Nations Child and Family Caring Society. By 2017 both Henry and Daxton were noticing that many
                In 2011, Henry and Daxton first got involved in activism. They learned about past and present injustices facing Indigenous communities, and wanted to take action. They had a lot of support from their teachers, and from groups like the First Nations Child and Family Caring Society. By 2017 both Henry and Daxton were noticing that many
                In 2011, Henry and Daxton first got involved in activism. They learned about past and present injustices facing Indigenous communities, and wanted to take action. They had a lot of support from their teachers, and from groups like the First Nations Child and Family Caring Society. By 2017 both Henry and Daxton were noticing that many
            </FutureOfOrgPara>
            <BioTitle>Our Team</BioTitle>
            <TeamSection />
        </Page>
    );
}

export default AboutPage;
