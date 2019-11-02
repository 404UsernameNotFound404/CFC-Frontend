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
`;

const Image = styled.img`
    width: 25%;
    border-radius: 0.5em;
`;

type Props = {
    title: string,
    para: string,
    imgSrc: string,
    imgSide: boolean
}

function AbouPage(props: Props) {
        return (
            <Page>
                {props.imgSide ? <Image src = {props.imgSrc} /> : ''}
                <TextSection>
                    <SectionTitle>{props.title}</SectionTitle>
                    <Para dangerouslySetInnerHTML = {{ __html: props.para }} />
                </TextSection>
                {!props.imgSide ? <Image src = {props.imgSrc} /> : ''}
            </Page>
        );
    }

export default AbouPage;
