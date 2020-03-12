import React, { useState } from 'react';
import styled from 'styled-components';

const Component = styled.div`
    padding: 1em;
`;

const Image = styled.img`
    width: 10em;
    height: 7em;
    border: thin black solid;
    border-radius: 0.5em;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Title = styled.h1`
    font-size: 1.25em;
`;

type Props = {
    imageData: {imageSrc: string, src: string}[],
    setImage: any,
    id: number
}

function PickImage(props: Props) { 
    const {imageData, setImage, id} = props;
    return (
        <Component>
            <Title>Images</Title>
            <ImageContainer>
                {imageData.map((ele, i) => <Image onClick = {() => {setImage(id, ele.src)}} src = {ele.imageSrc} key = {i} />)}
            </ImageContainer>
        </Component>
    )
}

export default PickImage;