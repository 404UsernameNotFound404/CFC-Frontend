import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DaxtonImage from '../../../img/DDOG.jpg'
import { Redirect } from 'react-router';
import BasicButton from '../../ComponentLibrayer/BasicButton';
import { BASEURL } from '../../../Constants'
import Cookie from 'js-cookie'
const axios = require("axios");

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

const ParaInput = styled.textarea`
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

const Para = styled.p`
    width: 80%;
    font-size: 1.5em;
    margin: auto;
`;

const Content = styled.div`
    margin: auto 0;
    width: 100%;
`;

const EditButtonContianer = styled.div`
    height: fit-content;
    margin: auto 0;
    margin-left: 3em;
`;

type Props = {
    desc: string,
    backgroundImage: any,
    left: boolean;
}

function UserPage(props: Props) {
    const [redierctToHome, setRedirectToHome] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [canEditMode, setCanEditMode] = useState(true);
    const [paraInputOne, setParaInputOne] = useState("");
    const [paraInputTwo, setParaInputTwo] = useState("");
    const [colour, setColour] = useState("");
    const [name, setName] = useState("");
    useEffect(() => {
        //check search params
        let params = new URLSearchParams(document.location.search.substring(1));
        let PageID = params.get("id");
        if (PageID == null) {
            setRedirectToHome(true);
        } else {
            //check if owner
            fetchAPI(PageID);
        }
      }, []);
    const updatePage = async () => {
        const res = await axios.post(`${BASEURL}/updatePage`, JSON.stringify({ JWTToken: Cookie.get("authToken"), Para1: paraInputOne, Para2: paraInputTwo, Colour: colour, Name: name }));
        console.log(res)
        try {
            //do some verifcation on this. Backend not set up yet
        } catch(err) {
            console.log(err);
        }
    }
    
    const fetchAPI = async (PageID: string) => {
        const res = await axios.post(`${BASEURL}/checkIsOwner`, JSON.stringify({ JWTToken: Cookie.get("authToken"), PageID: PageID }));
        console.log(res)
        try {
            if (res.data.IsOwner) {
                setCanEditMode(true)
            }
            setParaInputOne(res.data.Para1)
            setParaInputTwo(res.data.Para2)
            setColour(res.data.Colour)
            setName(res.data.Name)
        } catch(err) {
            console.log(err);
        }
    }

    const convertCleanStringToReadable = () => {

    }

    const cleanString = () => {
        
    }
    return (
        <Page>
            {redierctToHome ? <Redirect to = '/home' /> : ''}
            <Content>
                <TopBarContainer>
                    <ProfileImage src = {DaxtonImage} />
                    <TopBarTextContainer>
                        <TopBarText>{name}</TopBarText>
                        <TopBarText>email@email.ca</TopBarText>
                        <TopBarText>613-132-4512</TopBarText>
                    </TopBarTextContainer>
                    {canEditMode ? 
                    <EditButtonContianer>
                        <BasicButton activateButton = {editMode ?  () => {setEditMode(false)} : () => {setEditMode(true)}} text = "edit" active = {editMode} width = {'5em'} id = {20} /> 
                    </EditButtonContianer> : ''}
                </TopBarContainer>
                <TextContent>
                    <ParaTitle>Who Am I?</ParaTitle>
                    {editMode ? <ParaInput value = {paraInputOne} onChange = {(e) => {setParaInputOne(e.target.value)}} /> : <Para>{paraInputOne}</Para>}
                    <ParaTitle>What I Stand For</ParaTitle>
                    {editMode ? <ParaInput value = {paraInputTwo} onChange = {(e) => {setParaInputTwo(e.target.value)}}/> : <Para>{paraInputTwo}</Para>}
                </TextContent>
                {editMode ? 
                    <BasicButton activateButton = {updatePage} text = "Update" active = {!editMode} width = {'5em'} id = {20} /> 
                : ''}
            </Content>
        </Page>
    );
}

export default UserPage;

// Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
//                         Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
//                         when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
//                         It has survived not only five centuries, but also the leap into electronic typesetting, 
//                         remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
//                         sheets containing Lorem Ipsum passages, and more recently with desktop publishing software 
//                         like Aldus PageMaker including versions of Lorem Ipsum.