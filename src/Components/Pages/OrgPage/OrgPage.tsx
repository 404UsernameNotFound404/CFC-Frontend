import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import Cookie from 'js-cookie';
import { BASEURL } from '../../../Constants'
import SingleLineInput from "../../ComponentLibrayer/InputForSingleLine";
import PageCategories from '../Page/PageCategories'
import PhotoUploader from '../../ComponentLibrayer/PhotoUploader'
import { async } from 'q';
import DefaultImage from '../../../img/default.jpg'
import LoadingPage from '../../ComponentLibrayer/LoadingPage';

const axios = require("axios");

const Page = styled.div`
    width: 75em;
    margin: auto;
    margin-top: 5em;
    @media (max-width: 768px) {  
        width: 90%;
    }
`;

const InputContainer = styled.div`
    display: flex;
    width: 30em;
`;

const DescTitle = styled.h1`
    font-size: 1.75em;
`;

const DescInput = styled.textarea`
    width: 80%;
    height: 5em;
    margin: auto;
    resize: none;
    overflow: none;
    border: black solid thin;
    font-size: 1.5rem;
    font-family: 'Cormorant Garamond', serif;
    font-style: normal;
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

type NavBarDekstopProps = {
    logoutLogin: any
}

function OrgPage(props: NavBarDekstopProps) {
    const [canEdit, setCanEdit] = useState(false);
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [desc, setDesc] = useState("")
    const [inputs, setInputs] = useState([]);
    const [allCategories, setAllCategories] = useState([])
    const [message, setMessage] = useState({ error: false, text: "" })
    const [image, setImage] = useState("")
    const [loading, setLoading] = useState(true);
    const [imageHash, setImageHash] = useState(0)
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
        let params = new URLSearchParams(document.location.search.substring(1));
        let OrgID = params.get("id");
        if (OrgID == null) {
            setRedirectToHome(true);
        } else {
            try {
                const res = await axios.post(`${BASEURL}/getOrganization`, JSON.stringify({ OrgID: OrgID }), { headers: { "Authorization": Cookie.get("authToken") } });
                if (res.data.Image.length > 2) {
                    setImage(res.data.Image)
                } else {
                    setImage(DefaultImage)
                }
                setImageHash(Date.now())
                setInputs([
                    { title: "Email", value: res.data.Email, id: 0 },
                    { title: "Link", value: res.data.Link, id: 1 },
                    { title: "Name", value: res.data.Name, id: 2 },
                    { title: "Location", value: res.data.Location, id: 3 }
                ]);
                setCanEdit(res.data.IsOwner)
                setDesc(res.data.Desc)
                const resCats = await axios.post(`${BASEURL}/getCategories`);
                updateAllCategories(resCats.data, res.data.Instrests)
            } catch (err) {
                console.log(err);
            }
        }
        setLoading(false);
    }

    const updateAllCategories = async (allCategories: any, categories: any) => {
        setAllCategories(allCategories.map((ele: any) => {
            let dis = !categories.find((catEle: any) => {
                return catEle.ID === ele.ID
            })
            return { ...ele, disabled: dis }
        }));
    }

    const update = async () => {
        let catIdArray: any = []
        allCategories.map(ele => {
            if (!ele.disabled) {
                catIdArray.push(parseInt(ele.ID))
            }
        })
        try {
            const res = await axios.post(`${BASEURL}/editOrganization`, JSON.stringify({ Desc: desc, Name: inputs[2].value, Link: inputs[1].value, Location: inputs[3].value, Instrests: catIdArray }), { headers: { "Authorization": Cookie.get("authToken") } });
            if (res.data.Valid.length >= 0) {
                setMessage({ error: false, text: "Updated" })
            }
        } catch (err) {
            setMessage({ error: true, text: "Error updating" })
        }
    }

    if (!loading) {
        return (
            <Page>
                {redirectToHome ? <Redirect to="/home" /> : ""}
                <MessageToUser error={message.error}>{message.text}</MessageToUser>
                {
                    (inputs.length == 4) ?
                        <>
                            <InputContainer>
                                <SingleLineInput value={inputs[0].value} id={inputs[0].id} title={inputs[0].title} update={updateInput} />
                                <SingleLineInput value={inputs[1].value} id={inputs[1].id} title={inputs[1].title} update={updateInput} />
                            </InputContainer>
                            <InputContainer>
                                <SingleLineInput value={inputs[2].value} id={inputs[2].id} title={inputs[2].title} update={updateInput} />
                                <SingleLineInput value={inputs[3].value} id={inputs[3].id} title={inputs[3].title} update={updateInput} />
                            </InputContainer>
                        </>
                        : ""
                }
                <PageCategories width={"10em"} allCategories={allCategories} setAllCategories={setAllCategories} categories={[]} editMode={true} />
                <OrgImage src={`${image}?${imageHash}`} />
                <PhotoUploader update = {fetchAPI} />
                <DescTitle>Description: </DescTitle>
                <DescInput>{desc}</DescInput>
                <UpdateButton onClick={update}>Update</UpdateButton>
            </Page>
        );
    } else {
        return <LoadingPage />
    }
}

export default OrgPage;
