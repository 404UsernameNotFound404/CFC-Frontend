import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Page = styled.div`
    padding-top: 2.5em;
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: center;
`;

const SectionTitle = styled.h1`
    font-size: 2.5em;
    text-align: center;
    font-weight: lighter;
`;

const Para = styled.p`
    font-size: 1.25em;
    text-align: center;
    width: 90%;
    margin: auto;
`;

const TextSection = styled.div`
    width: 75%;
    height: fit-content;
    margin: auto;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 100%;
    }
`;

const ImageContainer = styled.div`
     width: 30%;
     height: fit-content;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    border-radius: 0.5em;
    /* transform: rotate(90deg); */
    image-orientation: from-image;
`;

const ImageTitle = styled.h4`
    text-align: center;
    font-size: 1em;
    margin: 0.4em;
`;

type Props = {
    title: string,
    para: string,
    imgSrc: string,
    imgSide: boolean,
    mobile: boolean,
    name: string
}

function AbouPage(props: Props) {
    return (
        <Page>
            {props.imgSide && props.mobile ?
                <ImageContainer>
                    <ImageTitle>{props.name}</ImageTitle>
                    <Image src={props.imgSrc} />
                </ImageContainer>
                : ''}
            <TextSection>
                <SectionTitle>{props.title}</SectionTitle>
                <Para dangerouslySetInnerHTML={{ __html: props.para }} />
            </TextSection>
            {!props.imgSide && props.mobile ?
                <ImageContainer>
                    <ImageTitle>{props.name}</ImageTitle>
                    <Image src={props.imgSrc} />
                </ImageContainer>
                : ''}
        </Page>
    );
}

export default AbouPage;
