import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'

const Content = styled.div`
    width: 100%;
    height: 25em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        height: fit-content;
    }
    margin: 1rem 0;
    margin-right: 2.5%;
    display: flex;
    justify-content: center;
`;

const Title = styled.h1`
    font-size: 5em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        font-size: 3em;
    }
    margin: 0;
`;

const SubTitle = styled.h2`
    font-size: 2.5em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        font-size: 1.75em;
    }
    margin: 0;
    margin-bottom: 0.25em;
`;

const Para = styled.p`
    margin: 0;
    font-size: 1.5em;
    color: black;
`;

type TextContainerStyle = {
    Color: string
}

const TextContainer = styled.div<TextContainerStyle>`
    width: 66.66%;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 100%;
    }
    margin: auto 0;
    height: fit-content;
    color: ${p => p.Color};
`;

const ImageContainer = styled.div`
    width: 33.33%;
    margin: auto 0;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const IssueLogo = styled.img`
    margin: auto 0;
    max-height: 90%;
    max-width: 100%;
    display: block;
`;

const Link = styled.a`
    font-size: 1.5em;
    margin: 0;
    color: #3c78d8;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

type LinkType = {name: string, link: string}

type Props = {
    title: string,
    subTitle: string,
    para: string,
    imageURL: string,
    linkArray: LinkType[]
}

function LearnPage(props: any) {
  const {para, title, subTitle, imageURL, Color, linkArray} = props;
  const isPhone = useMediaQuery({ minDeviceWidth: 768 })
  return (
    <Content>
        <TextContainer Color = {Color}>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
            <Para>{para}</Para>
            {
                props.linkArray.map((ele: LinkType) => {
                    return (<><Link target="_blank" href = {ele.link}>{ele.name}</Link><br /></>)
                })
            }
        </TextContainer>
        {isPhone ? 
        <ImageContainer>
            <IssueLogo src = {imageURL} />
        </ImageContainer>
        : ""}
    </Content>
  );
}

export default LearnPage;
