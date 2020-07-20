import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../Context/AppContext';
import ParaInput from '../../packages/para-input-react/ParaInput';
import Categories, { CategoryButtonProps, CategoryButtonStyleProps } from '../categories-react/Categories';
import { updateOrCreateOrg } from '../organization-card/organizationCard';
import testIds from './test/testIds';

const Component = styled.div`
    padding: 1em 0%;
    width: 95%;
    margin: auto;
    height: fit-content;
    z-index: 100;
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
    closeModal: any
    edit: boolean,
    desc?: string,
    _id?: string,
    name?: string,
    location?: string,
    email?: string,
    link?: string,
    interests?: number[],
    setLoading?: Function
}

const defaultDesc = "this is a short desc";

export default function CreatingEditingOrg(props: Props) {
    const { desc: descProps = defaultDesc, name = "", location = "", _id = "", email = "", link = "", interests = [], edit, setLoading = () => { } } = props;
    const [inputs, setInputs] = useState([
        { value: (name), placeholder: "Name", id: 0 },
        { value: (location), placeholder: "Location", id: 1 },
        { value: (email), placeholder: "Email", id: 2 },
        { value: (link), placeholder: "Link", id: 3 }
    ]);
    const [desc, setDesc] = useState(descProps);
    const c = useContext(AppContext);
    const [activeCategories, setActiveCategories] = useState(null);
    const [deleteReq, setDeleteReq] = useState(false);

    useEffect(() => {
        if (interests) setActiveCategories(interests);
        else setActiveCategories([])
    }, [])

    const createOrg = async () => {
        setLoading && setLoading(true);
        let res = await updateOrCreateOrg({ desc: desc, name: inputs[0].value, location: inputs[1].value, _id: _id, email: inputs[2].value, link: inputs[3].value, interests: activeCategories.map((ele: any) => parseFloat(ele)) }, edit, deleteReq);
        if (res) c.setMessageToUser({ message: edit ? "Failed to request change." : "Failed To Create Organization.", colour: "red" })
        else {
            c.setMessageToUser({ message: edit ? "Requested change." : "Created Organization.", colour: "green" })
            props.closeModal();
        }
        setLoading && setLoading(false);
    }

    const updateValue = (id: number, value: string) => {
        setInputs(inputs.map(ele => {
            if (id == ele.id) ele.value = value;
            return ele;
        }))
    }

    const updateActiveCategories = (newActiveCategories: number[]) => { setActiveCategories(newActiveCategories) }

    return (
        <Component data-testid={testIds.createEditOrg.container}>
            <Title data-testid={testIds.createEditOrg.title}>{edit ? "Request Edit" : "Create An Organization"}</Title>
            {
                inputs.map((ele, i) => <div key={i}><SingleLineInput onChange={(e) => { updateValue(ele.id, e.target.value) }} value={ele.value} placeholder={ele.placeholder} key={i} /></div>)
            }
            <ParaInput paragraphValue={desc} setParagraphValue={setDesc} editMode={true} title={"Description"} margin={"0"} width={"90%"} />
            <CategoryContainer>
                <Categories canHaveAllInactive={false} justifyContent={"space-between"} changeCategory={updateActiveCategories} CategoryButton={CategoryButton} activeCategories={activeCategories} />
            </CategoryContainer>
            {edit &&
                <DeleteCheckBoxContainer data-testid={testIds.createEditOrg.deleteCheckbox}>
                    <DeleteCheckBox type="checkbox" checked={deleteReq} onChange={() => { setDeleteReq(!deleteReq) }} />
                    <DeleteCheckBoxText>Does this organization no longer exists?<br />Check the box if it should be deleted.</DeleteCheckBoxText>
                </DeleteCheckBoxContainer>
            }
            <CreateButton data-testid={testIds.createEditOrg.createButton} onClick={createOrg}>{edit ? "Request Edit" : "Create"}</CreateButton>
        </Component>
    );

}