import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SectionOfPage from './SectionOfPage';
import TitleImage from '../../../img/AboutPage/protestPhoto.jpg'
import HenryPhoto from '../../../img/AboutPage/HenryPhoto.jpg'
import DaxtonPhoto from '../../../img/AboutPage/DaxtonPhoto.jpg'
import { useMediaQuery } from 'react-responsive'
import protester from '../../../img/protesterYelling.webp';
import ActivistPage from './TeamMember';
import SlideContainer from './SlidesComponents/SlideContainer';
import FirstSlide from './SlidesComponents/FirstSlide';
import SecondSlide from './SlidesComponents/SecondSlide';
import ThirdSlide from './SlidesComponents/ThirdSlide';
import PhotoOfFounders from '../../../img/BothOfUsPhoto.jpg'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css'
import TeamSection from './TeamSection';
import Carousel from '../../packages/carousel-react';

const Page = styled.div`
    padding-top: 3em;
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
    width: 100%;
    margin: auto;
    margin-bottom: 0.2em;
`;

const TitleSection = styled.div`
    width: 100%;
    margin-top: 2em;
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

const PageSubTitle = styled.h1`
    font-size: 2.5em;
    width: 65rem;
    margin: auto;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    font-weight: lighter;
    /* font-style: italic; */
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        margin-top: 2.5rem;
        width: 95%;
        margin: auto;
        font-size: 1.5rem;
        text-align: center;
    }
`;

const CarouselContainer = styled.div`
    width: fit-content;
    margin: auto;
`;

function AboutPage() {
    const isPhone = useMediaQuery({ minDeviceWidth: parseInt(process.env.REACT_APP_PHONE_BREAK, 10) }) 
    return (
        <Page>
            <TitleSection>
                <PageSubTitle>Connecting For Change is created and run by Daxton Rhead and Henry Morris, two friends with a passion for activism.</PageSubTitle>
                <PageTitle>Our Story</PageTitle>
                <CarouselContainer>
                    <Carousel width={isPhone ? "65rem" : "90%"} showArrows = {isPhone}>
                        <FirstSlide />
                        <SecondSlide />
                        <ThirdSlide />
                    </Carousel>
                </CarouselContainer>
            </TitleSection>
            <PhotoOfBothFounders src={PhotoOfFounders} />
            <FutureOfOrgParaTitle>What the future holds</FutureOfOrgParaTitle>
            <FutureOfOrgPara>
                We want to see Connecting For Change grow and help get people involved in campaigns and actions. Our list of organizations includes groups that do have protests or campaigns, but it also includes organizations with lots of educational resources for activists, and organizations that provide more direct help to people in need.
                <br /> <br />
                Connecting For Change believes that people can get involved in activism at any age. Whether you are a child, teenager, adult or senior citizen, we want to help you fight for the cause you care about.
            </FutureOfOrgPara>
            <BioTitle>Our Team</BioTitle>
            <TeamSection />
        </Page>
    );
}

export default AboutPage;
