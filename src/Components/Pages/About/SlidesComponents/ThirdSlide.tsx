import React from 'react'
import styled from 'styled-components'
import PhotoOfFounders from '../../../../img/BothOfUsPhoto.jpg'

const Component = styled.div`
    height: fit-content;
    margin: auto;
`;

const Title = styled.h1`
    margin-top: 0.5em;
    font-size: 1.7em;
`;

const UnderTitle = styled.h1`
    font-size: 1.7em;
    text-align: center;
`;

const Photo = styled.img`
    width: 70%;
    margin: auto;
    display: block;
    height: 20em;
    object-fit: cover;
    object-position: top;
`;

function ThirdSlide() {
    return (
        <Component>
            <Title>This is when the idea of Connecting for Change was born. </Title>
            <Photo src = {PhotoOfFounders} />
            <UnderTitle>This website’s purpose is to help like-minded people connect and join forces to fight injustice.</UnderTitle>
        </Component>
    )
}

export default ThirdSlide;