import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import DaxtonImage from '../../../../img/default.jpg'
import { Redirect } from 'react-router';
import LoadingComp from '../../../ComponentLibrayer/LoadingPage'
import ProfileTopPart from './ProfileTopPart';
import ParagraphInput from '../../../ComponentLibrayer/ParaInput/ParaInput'
import { AppContext } from '../../../../Context/AppContext';
import UpdateEditButton from '../../../ComponentLibrayer/UpdateEditButton';
import ContactModal from '../ContactModal';
import BasicButton from '../../../ComponentLibrayer/BasicButton';

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

const Content = styled.div`
    margin: auto 0;
    width: 100%;
`;

const ModalTitle = styled.h1`

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
    const [paraInputOne, setParaInputOne] = useState("Hit edit and change me.");
    const [paraInputTwo, setParaInputTwo] = useState("Hit edit and change me.");
    const [colour, setColour] = useState("");
    const [name, setName] = useState("");
    const [orginalPara1, setOrginalPara1] = useState("");
    const [orginalPara2, setOrginalPara2] = useState("");
    const [deleteChanges, setDeleteChanges] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [image, setImage] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [message, setMessage] = useState("");
    const c = useContext(AppContext);

    useEffect(() => {
        fetchAPI();
    }, [c.userToken])

    const updatePage = async () => {
        let activeTags: any = []
        allCategories.map(ele => {
            if (!ele.disabled) {
                activeTags.push(ele)
            }
        })
        if (orginalPara1 == paraInputOne && orginalPara2 == paraInputTwo && (compareArrays(activeTags, categories) || allCategories.length == 0)) {
            c.setMessageToUser({ message: "Successfully updated page.", colour: "green" })
            setEditMode(false);
            return
        }
        if (paraInputOne.length < 50 || paraInputTwo.length < 50) {
            c.setMessageToUser({ message: "Paragraphs need to be at least 50 characters.", colour: "red" })
        }
        activeTags = []
        allCategories.map(ele => {
            if (!ele.disabled) {
                activeTags.push(parseInt(ele.ID))
            }
        })
        try {
            c.setMessageToUser({ message: "Updating...", colour: "black" })
            const res = await axios.put(`${process.env.REACT_APP_BASEURL}/activist/`, JSON.stringify({ Para1: paraInputOne, Para2: paraInputTwo, Colour: colour, Name: name, Categories: activeTags }), { headers: { "Authorization": c.userToken } });
            if (res.data.Error.length >= 0) {
                c.setMessageToUser({message: res.data.Error, colour: "red"})
                return
            }
            resetParagraphsOrginalsAndSendMessage(true, "Successfully updated page.")
            fetchAPI()
        } catch (err) {
            resetParagraphsOrginalsAndSendMessage(true, "Successfully updated page.")
            fetchAPI()
        }
    }

    const compareArrays = (array1: any, array2: any) => {
        if (array1.length == array2.length) {
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
        try {
            setLoading(true);
            let params = new URLSearchParams(document.location.search.substring(1));
            let PageID = params.get("id");
            if (PageID == null) throw "No Page ID"
            const resRaw = await fetch(`${process.env.REACT_APP_BASEURL}/activist/${PageID}`, {
                method: "GET",
                headers: {
                    "Authorization": c.userToken
                }
            })
            const res = await resRaw.json();
            console.log(res);
            if (res.Error != undefined) throw "Error getting data"
            if (res.IsOwner) {
                setCanEditMode(true)
            }
            if (res.Image.length > 2) {
                setImage(res.Image)
            } else {
                setImage(DaxtonImage)
            }
            setColour(res.Colour)
            setName(res.Name)
            setEmail(res.Email)

            if (res.FirstTime == undefined) {
                setOrginalPara1(res.Para1)
                setOrginalPara2(res.Para2)
                setParaInputOne(res.Para1)
                setParaInputTwo(res.Para2)
            }
            setLoading(false);
            if (res.Categories != null) {
                setCategories(res.Categories)
            }
        } catch (err) {
            //ERROR HANDLING
            setLoading(false);
            setRedirectToHome(true);
        }
    }

    const switchEditMode = () => {
        if (editMode) {
            if (deleteChanges) {
                setDeleteChanges(false);
                resetParagraphsOrginalsAndSendMessage(false, "");
                return
            }
            updatePage();
        } else {
            setEditMode(true);
        }
    }

    const resetParagraphsOrginalsAndSendMessage = (setOrginal: boolean, message: string) => {
        c.setMessageToUser({ message: message, colour: "green" });
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

    const messageUser = async () => {
        try {
            if (message.length >= 3000 || message.length <= 0) throw "Message must be between 1 and 3000 characters"
            let PageID = new URLSearchParams(document.location.search.substring(1)).get("id");

            const resRaw = await fetch(`${process.env.REACT_APP_BASEURL}/activist/email/` + PageID, {
                method: "POST",
                body: JSON.stringify({ Body: message }),
                headers: {
                    "Authorization": c.userToken
                }
            });

            const res = await resRaw.json();
            if (res.Error) throw res.Error;
            setModalOpen(false);
            c.setMessageToUser({ message: "Message Sent", colour: "green" })
        } catch (err) {
            console.log(err)
            if (typeof err == "string") {
                c.setMessageToUser({ message: err, colour: "red" })
                return
            }
            c.setMessageToUser({ message: "Error Sending Message", colour: "red" })
        }
    }

    if (!loading) {
        return (
            <Page>
                {/* Split into more components */}
                <UpdateEditButton canEdit={canEditMode} update={editMode} switchFCN={switchEditMode} />
                {redierctToHome ? <Redirect to='/home' /> : ''}
                <Content>
                    <ProfileTopPart setModalOpen={setModalOpen} update={fetchAPI} image={image} allCategories={allCategories} setAllCategories={setAllCategories} name={name} canEditMode={canEditMode} editMode={editMode} categories={categories} />
                    <TextContent>
                        <ParagraphInput width={"80%"} margin={"auto"} title={"Who Am I?"} paragraphValue={paraInputOne} setParagraphValue={setParaInputOne} editMode={editMode} />
                        <ParagraphInput width={"80%"} margin={"auto"} title={"What I Stand For"} paragraphValue={paraInputTwo} setParagraphValue={setParaInputTwo} editMode={editMode} />
                    </TextContent>
                </Content>
                <ContactModal close={modalOpen} setClose={setModalOpen}>
                    <div style={{ height: "2em" }} />
                    <ParagraphInput height={"40em"} paragraphValue={message} setParagraphValue={setMessage} editMode={true} title={"Please Enter Your Message Here"} margin={"auto"} width={"95%"} />
                    <BasicButton margin={"0.5em"} width={"10em"} activateButton={messageUser} text={"Submit"} active={true} id={-1} />
                </ContactModal>
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