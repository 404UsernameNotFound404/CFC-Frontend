import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import SingleLineInput from "../../../ComponentLibrayer/InputForSingleLine";
import PageCategories from '../PageCategories'
import PhotoUploader from '../../../ComponentLibrayer/PhotoUploader'
import DefaultImage from '../../../../img/default.jpg'
import LoadingPage from '../../../ComponentLibrayer/LoadingPage';
import ParagraphInput from '../ParaInput'
import { useMediaQuery } from 'react-responsive';
import { AppContext } from '../../../../Context/AppContext';

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
    const [imageHash, setImageHash] = useState(0);
    const isPhone = useMediaQuery({ minDeviceWidth: parseInt(process.env.REACT_APP_PHONE_BREAK) });
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
        let params = new URLSearchParams(document.location.search.substring(1));
        let OrgID = params.get("id");
        if (OrgID == null) {
            setRedirectToHome(true);
        } else {
            try {
                const resRaw = await fetch(`${process.env.REACT_APP_BASEURL}/organization/${OrgID}`, {
                    method: "GET",
                    headers: {
                        "Authorization": c.userToken
                    }
                });
                const res = await resRaw.json();
                console.log(res)
                if (res.Image.length > 2) {
                    setImage(res.Image)
                } else {
                    setImage(DefaultImage)
                }
                setImageHash(Date.now())
                setInputs([
                    { title: "Email", value: res.Email, id: 0 },
                    { title: "Link", value: res.Link, id: 1 },
                    { title: "Name", value: res.Name, id: 2 },
                    { title: "Location", value: res.Location, id: 3 }
                ]);
                setCanEdit(res.IsOwner)
                setDesc(res.Desc)
                const resCats = await axios.post(`${process.env.REACT_APP_BASEURL}/getCategories`);
                updateAllCategories(resCats.data, res.Instrests)
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
            //need check
            const res = await axios.put(`${process.env.REACT_APP_BASEURL}/organization/`, JSON.stringify({ Desc: desc, Name: inputs[2].value, Link: inputs[1].value, Location: inputs[3].value, Instrests: catIdArray }), { headers: { "Authorization": c.userToken } });
            console.log(res)
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
                <PhotoUploader update={fetchAPI} />
                <ParagraphInput width={"80%"} margin={isPhone ? "0" : "auto"} title={"Description:"} paragraphValue={desc} setParagraphValue={setDesc} editMode={true} />
                <UpdateButton onClick={update}>Update</UpdateButton>
            </Page>
        );
    } else {
        return <LoadingPage />
    }
}

export default OrgPage;
