import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import SingleLineInput from "../../../ComponentLibrayer/InputForSingleLine";
import PageCategories from '../PageCategories'
import DefaultImage from '../../../../img/default.jpg'
import LoadingPage from '../../../ComponentLibrayer/LoadingPage';
import ParagraphInput from '../ParaInput'
import { AppContext } from '../../../../Context/AppContext';
import UpdateEditButton from '../../../ComponentLibrayer/UpdateEditButton';
import PhotoAndUploader from '../../../ComponentLibrayer/PhotoAndUploader';

const axios = require("axios");

const Page = styled.div`
    width: 75em;
    margin: auto;
    margin-top: 5em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        width: 90%;
    }
`;

const InputContainer = styled.div`
    display: flex;
    width: 30em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        width: 100%;
        display: block;
    }
`;

const UpdateButton = styled.div`
    margin-top: 1em;
    width: 8em;
    padding: 0.5em 0;
    background-color: #27f627;
    text-align: center;
    border-radius: 0.25em;
    font-size: 1.25em;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #1e971e;
    }
    margin-bottom: 2em;
`;

const OrgImage = styled.img`
    margin-left: 2em;
    width: 15em;
    height: 15em;
    object-fit: cover;
    object-position: middle;
`;

type MessageToUserProps = {
    error: boolean
}

const MessageToUser = styled.h1<MessageToUserProps>`
    font-size: 2em;
    color: ${p => p.error ? "red" : "green"};
`;

const TopSection = styled.div`
    display: flex;
    width: fit-content;
    margin: auto;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        display: block;
    }
`;

const BasicInfoInputSection = styled.div`
    margin: auto;
    margin-left: 2em;
`;

function OrgPage() {
    const [canEdit, setCanEdit] = useState(false);
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [desc, setDesc] = useState("")
    const [inputs, setInputs] = useState([{ id: -1, value: "", title: "" }, { id: -1, value: "", title: "" }, { id: -1, value: "", title: "" }, { id: -1, value: "", title: "" }]);
    const [allCategories, setAllCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState({ colour: "", text: "" })
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(true);
    const c = useContext(AppContext);
    useEffect(() => {
        fetchAPI()
    }, []);

    const updateInput = (id: number, value: string) => {
        if (canEdit) {
            setInputs(inputs.map(ele => {
                if (ele.id == id) {
                    ele.value = value;
                }
                return ele
            }))
        }
    }

    const fetchAPI = async () => {
        setLoading(true);
        try {
            let params = new URLSearchParams(document.location.search.substring(1));
            let OrgID = params.get("id");
            if (OrgID == null) throw "No Org ID"
            if (c.userToken.length <= 1) throw "No token"
            const resRaw = await fetch(`${process.env.REACT_APP_BASEURL}/organization/${OrgID}`, {
                method: "GET",
                headers: {
                    "Authorization": c.userToken
                }
            });
            const res = await resRaw.json();
            if (res.Error != undefined) throw "Error getting org data"
            if (res.Image.length > 2) {
                setImage(res.Image)
            } else {
                setImage(DefaultImage)
            }
            await console.log(res.Instrests)
            setCategories(res.Instrests)
            setInputs([
                { title: "Email", value: res.Email, id: 0 },
                { title: "Link", value: res.Link, id: 1 },
                { title: "Name", value: res.Name, id: 2 },
                { title: "Location", value: res.Location, id: 3 }
            ]);
            setCanEdit(res.IsOwner)
            setDesc(res.Desc)
        } catch (err) {
            setLoading(false)
            setRedirectToHome(true);
        }
        setLoading(false);
    }

    const update = async () => {
        let catIdArray: any = []
        allCategories.map(ele => {
            if (!ele.disabled) {
                console.log(ele)
                catIdArray.push(parseInt(ele.ID))
            }
        })
        try {
            //need check
            const resRaw = await fetch(`${process.env.REACT_APP_BASEURL}/organization/`, {
                method: "PUT",
                body: JSON.stringify({ Desc: desc, Name: inputs[2].value, Link: inputs[1].value, Location: inputs[3].value, Instrests: catIdArray }),
                headers: {
                    "Authorization": c.userToken
                }
            });
            const res = await resRaw.json();
            if (res.Valid.length >= 0) {
                setMessage({ colour: "green", text: "Updated" })
            }
        } catch (err) {
            setMessage({ colour: "red", text: "Error updating" })
        }
    }

    if (!loading) {
        return (
            <Page>
                {redirectToHome ? <Redirect to="/home" /> : ""}
                {/* <UpdateEditButton messageToUser={messageToUser} canEdit={canEditMode} update={editMode} switchFCN={switchEditMode} /> */}
                <UpdateEditButton messageToUser={message} canEdit={true} update={true} switchFCN={update} />
                <TopSection>
                    <PhotoAndUploader size={"15em"} canEdit={true} img={image} update={fetchAPI} />
                    <BasicInfoInputSection>
                        <InputContainer>
                            <SingleLineInput value={inputs[0].value} id={inputs[0].id} title={inputs[0].title} update={updateInput} />
                            <SingleLineInput value={inputs[1].value} id={inputs[1].id} title={inputs[1].title} update={updateInput} />
                        </InputContainer>
                        <InputContainer>
                            <SingleLineInput value={inputs[2].value} id={inputs[2].id} title={inputs[2].title} update={updateInput} />
                            <SingleLineInput value={inputs[3].value} id={inputs[3].id} title={inputs[3].title} update={updateInput} />
                        </InputContainer>
                    </BasicInfoInputSection>
                </TopSection>
                <PageCategories width={"10em"} allCategories={allCategories} setAllCategories={setAllCategories} categories={categories} editMode={true} />
                <ParagraphInput width={"80%"} margin={"auto"} title={"Description:"} paragraphValue={desc} setParagraphValue={setDesc} editMode={true} />
            </Page>
        );
    } else {
        return <LoadingPage />
    }
}

export default OrgPage;
