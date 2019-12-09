import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DaxtonImage from '../../../img/default.jpg'
import { Redirect } from 'react-router';
import { BASEURL } from '../../../Constants'
import Cookie from 'js-cookie'
import LoadingComp from '../../ComponentLibrayer/LoadingPage'
import ProfileTopPart from './ProfileTopPart';

const axios = require("axios");

const Page = styled.div`
    height: fit-content;
    margin-top: 5em;
    margin-bottom: 2em;
    display: flex;
    justify-content: center;
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
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [allCategoriyApiData, setAllCategoriyApiData] = useState([])
    const [image, setImage] = useState("")

    useEffect(() => {
        fetchAPI()
    }, []);

    const updatePage = async () => {
        let activeTags: any = []
        allCategories.map(ele => {
            if (!ele.disabled) {
                try {
                    activeTags.push(ele)
                } catch (err) {
                    console.log(err)
                }
            }
        })
        if (orginalPara1 == paraInputOne && orginalPara2 == paraInputTwo && (compareArrays(activeTags, categories) || allCategories.length == 0)) {
            setMessageToUser("successfully updated page")
            setEditMode(false);
            return
        }
        if (paraInputOne.length < 100 || paraInputTwo.length < 100) {
            setMessageToUser("Paragraphs need to be at least 100 characters")
        }
        activeTags = []
        allCategories.map(ele => {
            if (!ele.disabled) {
                try {
                    activeTags.push(parseInt(ele.ID))
                } catch (err) {
                    console.log(err)
                }
            }
        })
        const res = await axios.post(`${BASEURL}/updatePage`, JSON.stringify({ Para1: paraInputOne, Para2: paraInputTwo, Colour: colour, Name: name, Categories: activeTags }), { headers: { "Authorization": Cookie.get("authToken") } });
        try {
            if (res.data.Error.length >= 0) {
                setMessageToUser(res.data.Error)
                return
            }
            resetParagraphsOrginalsAndSendMessage(true, "successfully updated page")
            fetchAPI()
        } catch (err) {
            resetParagraphsOrginalsAndSendMessage(true, "successfully updated page")
            fetchAPI()
        }
    }

    const compareArrays = (array1: any, array2: any) => {
        if (array1.length === array2.length) {
            return !array1.find((ele: any) => {
                return array2.find((ele2: any) => {
                    return ele2 != ele
                })
            })
        }
        return false
    }

    const fetchAPI = async () => {
        //check search params
        let params = new URLSearchParams(document.location.search.substring(1));
        let PageID = params.get("id");
        if (PageID == null) {
            setRedirectToHome(true);
        } else {
            try {
                const res = await axios.post(`${BASEURL}/checkIsOwner`, JSON.stringify({ PageID: PageID }), { headers: { "Authorization": Cookie.get("authToken") } });
                if (res.data.IsOwner) {
                    setCanEditMode(true)
                }
                if (res.data.Image.length > 2) {
                    setImage(res.data.Image)
                } else {
                    setImage(DaxtonImage)
                }
                setOrginalPara1(res.data.Para1)
                setOrginalPara2(res.data.Para2)
                setParaInputOne(res.data.Para1)
                setParaInputTwo(res.data.Para2)
                setColour(res.data.Colour)
                setName(res.data.Name)
                setEmail(res.data.Email)
                setLoading(false);
                if (res.data.Categories != null) {
                    setCategories(res.data.Categories)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const switchEditMode = () => {
        //add loading symbol for this call
        if (allCategories.length <= 0) {
            getAllCategories();
        } else {
            updateAllCategories(allCategoriyApiData);
        }
        if (editMode) {
            if (deleteChanges) {
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
            if (allCategories.length < 0) {
                getAllCategories();
            }
            setEditMode(true);
        }
    }

    const getAllCategories = async () => {
        const res = await axios.post(`${BASEURL}/getCategories`);
        console.log(res.data)
        updateAllCategories(res.data)
        setAllCategoriyApiData(res.data)
        setEditMode(true);
    }

    const updateAllCategories = async (allCategories: any) => {
        console.log(allCategories)
        setAllCategories(allCategories.map((ele: any) => {
            let dis = !categories.find((catEle: any) => {
                return catEle.ID === ele.ID
            })
            console.log(ele)
            return { ...ele, disabled: dis }
        }));
    }

    const resetParagraphsOrginalsAndSendMessage = (setOrginal: boolean, message: string) => {
        setMessageToUser(message);
        setEditMode(false);
        if (setOrginal) {
            setOrginalPara1(paraInputOne);
            setOrginalPara2(paraInputTwo);
            setAllCategories(allCategories.map(ele => {
                return { ...ele, disabled: true }
            }))
        } else {
            setParaInputOne(orginalPara1);
            setParaInputTwo(orginalPara2);
        }
    }

    if (!loading) {
        return (
            <Page>
                {/* Split into more components */}
                {redierctToHome ? <Redirect to='/home' /> : ''}
                <Content>
                    <ProfileTopPart update={fetchAPI} image={image} setAllCategories={setAllCategories} profilePhoto={DaxtonImage} name={name} email={email} canEditMode={canEditMode} editMode={editMode} updateFunction={updatePage} messageToUser={messageToUser} switchEditMode={switchEditMode} allCategories={allCategories} categories={categories} />
                    <TextContent>
                        <ParaTitle>Who Am I?</ParaTitle>
                        {paraInputOne == undefined && !editMode ? "Click the edit button to fill me in!" : ""}
                        {editMode ? <ParaInput value={paraInputOne} onChange={(e) => { setParaInputOne(e.target.value) }} /> : <Para>{paraInputOne}</Para>}
                        <ParaTitle>What I Stand For</ParaTitle>
                        {paraInputTwo == undefined && !editMode ? "Click the edit button to fill me in!" : ""}
                        {editMode ? <ParaInput value={paraInputTwo} onChange={(e) => { setParaInputTwo(e.target.value) }} /> : <Para>{paraInputTwo}</Para>}
                    </TextContent>
                </Content>
            </Page>
        );
    } else {
        return (
            <LoadingComp />
        )
    }
}

export default UserPage;

// Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
// Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
// when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
// It has survived not only five centuries, but also the leap into electronic typesetting, 
// remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
// sheets containing Lorem Ipsum passages, and more recently with desktop publishing software 
// like Aldus PageMaker including versions of Lorem Ipsum.