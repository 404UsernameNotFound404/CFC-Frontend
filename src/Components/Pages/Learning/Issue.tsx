import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

type ContentProps = {
    imageURL: string
}
const Content = styled.div<ContentProps>`
    width: 47.5%;
    height: fit-content;
    margin: 1rem 0;
    margin-right: 2.5%;
    background-image: url(${p => p.imageURL});
    background-size: 100% 100%;
    /* background-position: bottom; */
    color: white;
`;

const Title = styled.h1`
    font-size: 2em;
    margin: 0;
    margin-bottom: 0.25em;
`;

const SubTitle = styled.h2`
    font-size: 1.5em;
    margin: 0;
    margin-bottom: 0.25em;
`;

const Para = styled.p`
    margin: 0;
`;

const DarkOvelay = styled.div`
    background-color: rgba(0,0,0,0.4);
    width: 90%;
    padding: 5%;
    height: fit-content;
`;

type Props = {
    title: string,
    subTitle: string,
    para: string,
    imageURL: string
}

function LearnPage(props: any) {
  const {para, title, subTitle, imageURL} = props;
  return (
    <Content imageURL = {imageURL}>
        <DarkOvelay>
            <Title>{title}</Title>
            <SubTitle>{subTitle}</SubTitle>
            <Para>{para}</Para>
        </DarkOvelay>
    </Content>
  );
}

export default LearnPage;
