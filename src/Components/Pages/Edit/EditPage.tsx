import React from 'react';
import styled from 'styled-components';
import DaxtonImage from '../../../img/DDOG.jpg'

const Page = styled.div`
    height: fit-content;
    margin-top: 5em;
    margin-bottom: 2em;
    display: flex;
    justify-content: center;
`;

const ProfileImage = styled.img`
    margin: 0;
    width: 10em;
    height: 10em;
    border-radius: 50%;
    display: block;
    border: #3c78d8 0.25em solid;
`;

const TopBarContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: fit-content;
`;

const TopBarTextContainer = styled.div`
    margin: auto 0;
    margin-left: 1em;
`;

const TopBarText = styled.h1`
    font-size: 1.75em;
    font-family: "Times New Roman", Times, serif !important;
`;

const TextContent = styled.div`
    text-align: center;
`;

const ParaTitle = styled.h1`

`;

const Para = styled.textarea`
    width: 80%;
    height: 10em;
    margin: auto;
    resize: none;
    overflow: none;
    border: lightgrey solid thin;
    /* background-color: grey; */
    font-size: 1.5em;
    font-family: 'Cormorant Garamond', serif;
`;

const Content = styled.div`
    margin: auto 0;
    width: 100%;
`;

type Props = {
    desc: string,
    backgroundImage: any,
    left: boolean;
}

function EditPage(props: Props) {
    return (
        <Page>
            <Content>
                <TopBarContainer>
                    <ProfileImage src = {DaxtonImage} />
                    <TopBarTextContainer>
                        <TopBarText>Henry Morris</TopBarText>
                        <TopBarText>email@email.ca</TopBarText>
                        <TopBarText>613-132-4512</TopBarText>
                    </TopBarTextContainer>
                </TopBarContainer>
                <TextContent>
                    <ParaTitle>Who Am I?</ParaTitle>
                    <Para />
                    <ParaTitle>What I Stand For</ParaTitle>
                    <Para />
                </TextContent>
            </Content>
        </Page>
    );
}

export default EditPage;

// Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
//                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
//                         when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
//                         It has survived not only five centuries, but also the leap into electronic typesetting, 
//                         remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
//                         sheets containing Lorem Ipsum passages, and more recently with desktop publishing software 
//                         like Aldus PageMaker including versions of Lorem Ipsum.