import React from 'react'
import styled from 'styled-components'
import HaveAHeartDay from '../../../../img/heartDay.jpg'
import ShannensDream from '../../../../img/ShannensDream.png'
import { useMediaQuery } from 'react-responsive'

const StartOfStory = styled.h1`
    font-size: 1.8em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        width: 90%;
        margin: auto;
        text-align: center;
        margin-bottom: 0.5em;
    }
`;

const PhotoAndTextContainer = styled.div`
    width: 33%;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 90%;
    }
`;

const Photo = styled.img`
    width: 100%;
    height: 15em;
    object-fit: cover;
    object-position: 0 -4em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        height: 12em;
    }
`;

const Desc = styled.p`
    text-align: center;
    width: 90%;
    margin: 1em auto;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        margin: 0.25em;
        margin-bottom: 0;
    }
`;

const PhotosContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`;

const Container = styled.div`
    margin: auto;
`;

function FirstSlide() {
    const isPhone = useMediaQuery({ minDeviceWidth: parseInt(process.env.REACT_APP_PHONE_BREAK, 10) })
    return (
        <Container>
            <StartOfStory>In 2011, Henry and Daxton first got involved in activism. They learned about past and present injustices facing Indigenous communities, and wanted to take action.</StartOfStory>
            <PhotosContainer>
                <PhotoAndTextContainer>
                    <Photo src={HaveAHeartDay} />
                    <Desc>Have a Heart Day is an annual child-led event on Parliament Hill. Children sing songs, read letters, and bring signs, to tell the government that First Nations kids deserve equitable access to services.</Desc>
                </PhotoAndTextContainer>
                {!isPhone ? '' :
                    <PhotoAndTextContainer>
                        <Photo src={ShannensDream} />
                        <Desc>Shannen’s Dream is a campaign to fight for “safe and comfy schools” and culturally relevant education for all children. It is named in honour of Shannen Koostachin from Attawapiskat First Nation.</Desc>
                    </PhotoAndTextContainer>
                }
            </PhotosContainer>
        </Container>
    )
}

export default FirstSlide