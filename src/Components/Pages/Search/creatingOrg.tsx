import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import ParaInput from '../../packages/para-input-react/ParaInput';
import PageCategories from '../Page/PageCategories';
import { AppContext } from '../../../Context/AppContext';
import LoadingPage from '../../packages/LoadingPage';

const axios = require("axios");

const Component = styled.div`
    padding: 1em 2em;
    width: 100%;
`;

const SingleLineInput = styled.input`
    width: 60%;
    border: none;
    border-bottom: black thin solid;
    font-size: 1.25em;
    padding-bottom: 0.25em;
    margin-bottom: 0.5em;
`;

const Title = styled.h4`
    font-size: 1.5em;
    margin: 0.5em 0;
`;

const CreateButton = styled.div`
    margin-top: 0.5em;
    width: fit-content;
    border-radius: 0.5em;
    padding: 0.5em 2em;
    background-color: #3c78d8;
    margin-bottom: 0.5em;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #183e7c;
    }
`;

const DeleteCheckBox = styled.input`
    width: 1.25em;
    height: 1.25em;
    margin: auto 0;
`;

const DeleteCheckBoxContainer = styled.div`
    display: flex;
`;

const DeleteCheckBoxText = styled.p`
    margin-left: 0.5em;
    font-size: 1em;
`;

type Props = {
    setClose: any
    edit: boolean,
    desc?: string,
    id?: string,
    name?: string,
    location?: string,
    email?: string,
    link?: string,
    interests?: { Name: string, Colour: string, ID: string }[],
    update?: Function
}

function CreatingOrg(props: Props) {
    const [inputs, setInputs] = useState([
        { value: (props.name ? props.name : ""), placeholder: "Name", id: 0 },
        { value: (props.location ? props.location : ""), placeholder: "Location", id: 1 },
        { value: (props.email ? props.email : ""), placeholder: "Email", id: 2 },
        { value: (props.link ? props.link : ""), placeholder: "Link", id: 3 }
    ]);
    const [desc, setDesc] = useState(props.desc == undefined ? "this is a short desc" : props.desc);
    const c = useContext(AppContext);
    const [allCategories, setAllCategories] = useState(null);
    const [updatedCats, setUpdatedCats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteReq, setDeleteReq] = useState(false);

    useEffect(() => {
        fetchAPI();
    }, [])

    const fetchAPI = async () => {
        try {
            setLoading(true);
            const resRaw = await fetch(`${process.env.REACT_APP_BASEURL}/getCategories`, { method: "GET" });
            let res = await resRaw.json();
            res = res.map((ele: any) => {
                if (props.interests != undefined) return { ...ele, disabled: !props.interests.find(eleIn => (eleIn.ID == (ele.ID + ""))) }
                return { ele, disabled: true };
            })
            console.log(res)
            setAllCategories(res);
            setLoading(false);
        } catch (err) {
            if (typeof err == "string") {
                c.setMessageToUser({ message: err, colour: "red" })
            }
            c.setMessageToUser({ message: "Error Getting Categories", colour: "red" })
            setLoading(false);
        }
    }

    const createOrg = async () => {
        try {
            setLoading(true);
            let activeInterests = allCategories.filter((ele: any) => {
                if (!ele.disabled) {
                    delete ele["disabled"];
                    ele.ID = parseInt(ele.ID);
                    return ele;
                }
            });
            let res;
            if (props.edit) res = await axios.put(`${process.env.REACT_APP_BASEURLNODE}/organization/request/${props.id}`, { deleteReq: deleteReq, name: inputs[0].value, location: inputs[1].value, email: inputs[2].value, link: inputs[3].value, desc: desc, interests: activeInterests })
            else res = await axios.post(`${process.env.REACT_APP_BASEURLNODE}/organization/`, { name: inputs[0].value, location: inputs[1].value, email: inputs[2].value, link: inputs[3].value, desc: desc, interests: activeInterests })
            if (res.data.error != undefined) throw res.error;
            c.setMessageToUser({ message: !props.edit ? "Created Organization" : "Requested Edit", colour: "green" })
            if (props.update) props.update();
            props.setClose(false);
        } catch (err) {
            if (typeof err == "string") {
                c.setMessageToUser({ message: err, colour: "red" })
            }
            c.setMessageToUser({ message: "Error Creating Organization", colour: "red" })
            setLoading(false);
        }
    }

    const updateValue = (id: number, value: string) => {
        setInputs(inputs.map(ele => {
            if (id == ele.id) ele.value = value;
            return ele;
        }))
    }

    if (!loading) {
        return (
            <Component>
                <Title>Create an organization</Title>
                {
                    inputs.map((ele, i) => <div key={i}><SingleLineInput onChange={(e) => { updateValue(ele.id, e.target.value) }} value={ele.value} placeholder={ele.placeholder} key={i} /></div>)
                }
                <ParaInput paragraphValue={desc} setParagraphValue={setDesc} editMode={true} title={"Description"} margin={"0"} width={"90%"} />
                <PageCategories widthOfCot={"90%"} width={"60%"} margin={"-0.5em"} allCategories={allCategories} setAllCategories={setAllCategories} categories={props.interests} editMode={true} />
                {props.edit ?
                    <DeleteCheckBoxContainer>
                        <DeleteCheckBox type="checkbox" checked={deleteReq} onChange={() => { setDeleteReq(!deleteReq) }} />
                        <DeleteCheckBoxText>Does this organization no longer exists?<br/>Check the box if it should be deleted.</DeleteCheckBoxText>
                    </DeleteCheckBoxContainer>
                    : ""}
                <CreateButton onClick={createOrg}>{props.edit ? "Request Edit" : "Create"}</CreateButton>
            </Component>
        )
    } else {
        return (
            <LoadingPage />
        )
    }

}

export default CreatingOrg;