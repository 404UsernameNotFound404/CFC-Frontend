import React from 'react'
import styled from 'styled-components'
import HaveAHeartDay from '../../../../img/heartDay.jpg'
import ShannensDream from '../../../../img/ShannensDream.png'

const StartOfStory = styled.h1`
    font-size: 1.8em;
`;

const PhotoAndTextContainer = styled.div`
    width: 33%;
`;

const Photo = styled.img`
    width: 100%;
    height: 15em;
    object-fit: cover;
    object-position: 0 -4em;
`;

const Desc = styled.p`
    text-align: center;
    width: 90%;
    margin: 1em auto;
`;

const PhotosContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`;

function FirstSlide() {
    return (
        <>
            <StartOfStory>In 2011, Henry and Daxton first got involved in activism. They learned about past and present injustices facing Indigenous communities, and wanted to take action.</StartOfStory>
            <PhotosContainer>
                <PhotoAndTextContainer>
                    <Photo src={HaveAHeartDay} />
                    <Desc>Have a heart day started because of... .This protest was one of the first Daxton and Henry went to.</Desc>
                </PhotoAndTextContainer>
                <PhotoAndTextContainer>
                    <Photo src={ShannensDream} />
                    <Desc>Shannens dream is a campaign to ... Daxton write it I can't</Desc>
                </PhotoAndTextContainer>
            </PhotosContainer>
        </>
    )
}

export default FirstSlide