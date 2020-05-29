import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../Context/AppContext';
import ParaInput from '../../packages/para-input-react/ParaInput';
import Categories, { CategoryButtonProps, CategoryButtonStyleProps } from '../categories-react/Categories';
import { updateOrCreateOrg } from '../organization-card';
import { stringify } from 'querystring';

const axios = require("axios");

const Component = styled.div`
    padding: 1em 0%;
    width: 95%;
    margin: auto;
    height: fit-content;
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

const CategoryContainer = styled.div`
    width: 92%;
    margin: 0.25rem 0;
`;

const CategoryButtonStyle = styled.div<CategoryButtonStyleProps>`
    background-color: ${p => p.colour};
    border-radius: 0.5em;
    width: 7rem;
    margin: 0 0.1rem;
    margin-bottom: 0.5rem;
    padding: 1rem 0.5rem;
    text-align: center;
    font-size: 1rem;
    color: black !important;
    opacity: ${p => p.active ? '1' : '0.5'};
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        padding: 1em 1%;
        width: 8em;
    }
    display: flex;
    justify-content: center;
    cursor: pointer;
    &:hover {
        border-color: transparent;
        color: white;
    }
`;

const CategoryButton = (props: CategoryButtonProps) => {
    return (
        <CategoryButtonStyle onClick={() => { props.activateButton(props.ID) }} active={props.Active} colour={props.Colour}>{props.Name}</CategoryButtonStyle>
    )
}

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

export default function CreatingEditingOrg(props: Props) {
    const { name, location, id, email, link, interests } = props;
    const [inputs, setInputs] = useState([
        { value: (props.name ? props.name : ""), placeholder: "Name", id: 0 },
        { value: (props.location ? props.location : ""), placeholder: "Location", id: 1 },
        { value: (props.email ? props.email : ""), placeholder: "Email", id: 2 },
        { value: (props.link ? props.link : ""), placeholder: "Link", id: 3 }
    ]);
    const [desc, setDesc] = useState(props.desc == undefined ? "this is a short desc" : props.desc);
    const c = useContext(AppContext);
    const [activeCategories, setActiveCategories] = useState(null);
    const [deleteReq, setDeleteReq] = useState(false);

    useEffect(() => {
        console.log(props.interests.map(ele => ele.ID.toString()))
        setActiveCategories(props.interests.map(ele => ele.ID.toString()));
    }, [])

    const createOrg = async () => {
        console.log(props.edit)
        // let res = await updateOrCreateOrg({ desc: desc, name: name, location: location, id: id, email: email, link: link, interests: interests}, props.edit, deleteReq);
        // if (!res) {
        //     console.log("FAILURE")
        // } else {
        //     console.log(res);
        // }
    }

    const updateValue = (id: number, value: string) => {
        setInputs(inputs.map(ele => {
            if (id == ele.id) ele.value = value;
            return ele;
        }))
    }

    const updateActiveCategories = (newActiveCategories: number[]) => { setActiveCategories(newActiveCategories) }

    return (
        <Component>
            <Title>{props.edit ? "Request Edit" : "Create an organization"}</Title>
            {
                inputs.map((ele, i) => <div key={i}><SingleLineInput onChange={(e) => { updateValue(ele.id, e.target.value) }} value={ele.value} placeholder={ele.placeholder} key={i} /></div>)
            }
            <ParaInput paragraphValue={desc} setParagraphValue={setDesc} editMode={true} title={"Description"} margin={"0"} width={"90%"} />
            <CategoryContainer>
                <Categories justifyContent={"space-between"} changeCategory={updateActiveCategories} CategoryButton={CategoryButton} activeCategories={activeCategories} />
            </CategoryContainer>
            {/* <PageCategories widthOfCot={"90%"} width={"60%"} margin={"-0.5em"} allCategories={allCategories} setAllCategories={setAllCategories} categories={props.interests} editMode={true} /> */}
            {props.edit ?
                <DeleteCheckBoxContainer>
                    <DeleteCheckBox type="checkbox" checked={deleteReq} onChange={() => { setDeleteReq(!deleteReq) }} />
                    <DeleteCheckBoxText>Does this organization no longer exists?<br />Check the box if it should be deleted.</DeleteCheckBoxText>
                </DeleteCheckBoxContainer>
                : ""}
            <CreateButton onClick={createOrg}>{props.edit ? "Request Edit" : "Create"}</CreateButton>
        </Component>
    )
}