import React from 'react'
import styled from 'styled-components'
import HaveAHeartDay from '../../../../img/heartDay.jpg'
import ShannensDream from '../../../../img/ShannensDream.png'
import { useMediaQuery } from 'react-responsive'

const StartOfStory = styled.h1`
    font-size: 1.8em;
    @media (max-width: 768px) {
        width: 90%;
        margin: auto;
        text-align: center;
        margin-bottom: 0.5em;
    }
`;

const PhotoAndTextContainer = styled.div`
    width: 33%;
    @media (max-width: 768px) { 
        width: 90%;
    }
`;

const Photo = styled.img`
    width: 100%;
    height: 15em;
    object-fit: cover;
    object-position: 0 -4em;
    @media (max-width: 768px) { 
        height: 12em;
    }
`;

const Desc = styled.p`
    text-align: center;
    width: 90%;
    margin: 1em auto;
    @media (max-width: 768px) { 
        margin: 0.25em;
        margin-bottom: 0;
    }
`;

const PhotosContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`;

function FirstSlide() {
    const isPhone = useMediaQuery({ minDeviceWidth: 768 })
    return (
        <>
            <StartOfStory>In 2011, Henry and Daxton first got involved in activism. They learned about past and present injustices facing Indigenous communities, and wanted to take action.</StartOfStory>
            <PhotosContainer>
                <PhotoAndTextContainer>
                    <Photo src={HaveAHeartDay} />
                    <Desc>Have a heart day started because of... .This protest was one of the first Daxton and Henry went to.</Desc>
                </PhotoAndTextContainer>
                {!isPhone ? '' :
                    <PhotoAndTextContainer>
                        <Photo src={ShannensDream} />
                        <Desc>Shannens dream is a campaign to ... Daxton write it I can't</Desc>
                    </PhotoAndTextContainer>
                }
            </PhotosContainer>
        </>
    )
}

export default FirstSlide