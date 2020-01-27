import React from 'react'
import styled from 'styled-components'
import PhotoOfFounders from '../../../../img/BothOfUsPhoto.jpg'
import { useMediaQuery } from 'react-responsive';

const Component = styled.div`
    height: fit-content;
    margin: auto;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 90%;
    }
`;

const Title = styled.h1`
    margin-top: 0.5em;
    font-size: 1.7em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        font-size: 1.4em;
        text-align: center;
    }
`;

const UnderTitle = styled.h1`
    font-size: 1.7em;
    text-align: center;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        font-size: 1.4em;
        text-align: center;
    }
`;

const Photo = styled.img`
    width: 70%;
    margin: auto;
    display: block;
    height: 20em;
    object-fit: cover;
    object-position: top;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 100%;
    }
`;

function ThirdSlide() {
    const isPhone = useMediaQuery({ minDeviceWidth: process.env.REACT_APP_PHONE_BREAK  })
    return (
        <Component>
            <Title>This is when the idea of Connecting for Change was born. </Title>
            <Photo src={PhotoOfFounders} />
            <UnderTitle>This website’s purpose is to help like-minded people connect and join forces to fight injustice.</UnderTitle>
        </Component>
    )
}

export default ThirdSlide;