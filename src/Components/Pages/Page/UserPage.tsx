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
    @media (max-width: 768px) { 
        margin: auto;
    }
`;

const TopBarContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: fit-content;
    @media (max-width: 768px) {
        display: inline-block;
    }
`;

const TopBarTextContainer = styled.div`
    margin: auto 0;
    margin-left: 1em;
    @media (max-width: 768px) { 
        margin: 1em;
        text-align: center;
    }
`;

const TopBarText = styled.h1`
    font-size: 1.75em;
    font-family: "Times New Roman", Times, serif !important;
`;

const TextContent = styled.div`
    text-align: center;
`;

const ParaTitle = styled.h1``;

const ParaInput = styled.textarea`
    width: 80%;
    height: 10em;
    margin: auto;
    resize: none;
    overflow: none;
    border: lightgrey solid thin;
    font-size: 1.5rem;
    font-family: 'Cormorant Garamond', serif;
    font-style: normal;
    text-align: center;
`;

const Para = styled.p`
    width: 80%;
    font-size: 1.5rem;
    margin: auto;
    font-weight: lighter;
    font-style: normal;
    font-family: 'Cormorant Garamond', serif;
`;

const Content = styled.div`
    margin: auto 0;
    width: 100%;
`;

const EditButtonContianer = styled.div`
    height: fit-content;
    margin: auto 0;
    margin-left: 3em;
    @media (max-width: 768px) { 
        width: 100%;
        margin: 1em 0;
    }
`;

const MessageToUser = styled.h1`
    font-size: 1em;
    text-align: center;
    width: 15em;
    margin: 1rem;
    margin-right: auto;
`;

type Props = {
    desc: string,
    backgroundImage: any,
    left: boolean;
}

function UserPage(props: Props) {
    const [redierctToHome, setRedirectToHome] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [canEditMode, setCanEditMode] = useState(false);
    const [paraInputOne, setParaInputOne] = useState("");
    const [paraInputTwo, setParaInputTwo] = useState("");
    const [colour, setColour] = useState("");
    const [name, setName] = useState("");
    const [orginalPara1, setOrginalPara1] = useState("");
    const [orginalPara2, setOrginalPara2] = useState("");
    const [messageToUser, setMessageToUser] = useState("");
    const [deleteChanges, setDeleteChanges] = useState(false);
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhone] = useState("");

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
        if (orginalPara1 == paraInputOne && orginalPara2 == paraInputTwo) {
            setMessageToUser("successfully updated page")
            setEditMode(false);
            return
        }
        const res = await axios.post(`${BASEURL}/updatePage`, JSON.stringify({ JWTToken: Cookie.get("authToken"), Para1: paraInputOne, Para2: paraInputTwo, Colour: colour, Name: name }));
        try {
            if (res.data.Error.length >= 0) {
                setMessageToUser("could not update")
                return
            }
            resetParagraphsOrginalsAndSendMessage(true, "successfully updated page")
        } catch(err) {
            resetParagraphsOrginalsAndSendMessage(true, "successfully updated page")
        }
    }
    
    const fetchAPI = async (PageID: string) => {
        const res = await axios.post(`${BASEURL}/checkIsOwner`, JSON.stringify({ JWTToken: Cookie.get("authToken"), PageID: PageID }));
        console.log(res)
        try {
            if (res.data.IsOwner) {
                setCanEditMode(true)
            }
            setOrginalPara1(res.data.Para1)
            setOrginalPara2(res.data.Para2)
            setParaInputOne(res.data.Para1)
            setParaInputTwo(res.data.Para2)
            setColour(res.data.Colour)
            setName(res.data.Name)
            setEmail(res.data.Email)
        } catch(err) {
            console.log(err);
        }
    }

    const switchEditMode = () => {
        if (editMode) {
            if(deleteChanges) {
                setDeleteChanges(false);
                resetParagraphsOrginalsAndSendMessage(false, "");
                return
            }
            if (orginalPara1 != paraInputOne || orginalPara2 != paraInputTwo) {
                setDeleteChanges(true);
                setMessageToUser("Un updated changes. Click again if you want to delete changes")
                return
            }
            setMessageToUser("");
            setEditMode(false);
        } else {
            setMessageToUser("");
            setEditMode(true);
        }
    }

    const resetParagraphsOrginalsAndSendMessage = (setOrginal: boolean,  message: string) => {
        setMessageToUser(message);
        setEditMode(false);
        if (setOrginal) {
            setOrginalPara1(paraInputOne);
            setOrginalPara2(paraInputTwo);
        } else {
            setParaInputOne(orginalPara1);
            setParaInputTwo(orginalPara2);
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
                        <TopBarText>{email}</TopBarText>
                        <TopBarText>{phoneNumber}</TopBarText>
                    </TopBarTextContainer>
                    {canEditMode ? 
                    <EditButtonContianer>
                        <MessageToUser>{messageToUser}</MessageToUser>
                        <BasicButton activateButton = {switchEditMode} text = "edit" active = {editMode} width = {'5em'} id = {20} /> 
                    </EditButtonContianer> : ''}
                </TopBarContainer>
                <TextContent>
                    <ParaTitle>Who Am I?</ParaTitle>
                    {paraInputOne == undefined && !editMode ? "Click the edit button to fill me in!" : ""}
                    {editMode ? <ParaInput value = {paraInputOne} onChange = {(e) => {setParaInputOne(e.target.value)}} /> : <Para>{paraInputOne}</Para>}
                    <ParaTitle>What I Stand For</ParaTitle>
                    {paraInputTwo == undefined && !editMode ? "Click the edit button to fill me in!" : ""}
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