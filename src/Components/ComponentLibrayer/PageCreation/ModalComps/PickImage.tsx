import React, { useState } from 'react';
import styled from 'styled-components';
import PhotoUploader from '../../PhotoUploader';

const Component = styled.div`
    padding-bottom: 2em;
`;

const Image = styled.img`
    width: 15em;
    height: 10em;
    border: 1px black solid;
    margin-right: 1em;
    border-radius: 0.25em;
    object-fit: cover;
`;

const ImageContainer = styled.div`
    margin-left: 1em;
    display: flex;
    flex-wrap: wrap;
`;

const Title = styled.h1`
    margin: 0;
    height: 4rem;
    padding-left: 1rem;
    line-height: 4rem;
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
    background-color: #eee;
    font-size: 2em;
    margin-bottom: 0.5em;
    border-bottom: thin grey solid;
`;

const PhotoUploaderContainer = styled.div`
    margin-left: 1em;
`;

type Props = {
    imageData: {imageSrc: string}[],
    setImage: any,
    id: number
}

function PickImage(props: Props) { 
    const {imageData, setImage, id} = props;
    return (
        <Component>
            <Title>Pick An Image</Title>
            <ImageContainer>
                {/* TO DO HAVE DELETE BUTTON ON IMAGE */}
                {imageData.map((ele, i) => <Image onClick = {() => {setImage(id, ele.imageSrc)}} src = {ele.imageSrc} key = {i} />)}
            </ImageContainer>
            <PhotoUploaderContainer>
            <PhotoUploader update = {() => {console.log("update")}} />
            </PhotoUploaderContainer>
        </Component>
    )
}

export default PickImage;