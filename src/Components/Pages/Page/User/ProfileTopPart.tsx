import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BasicButton from '../../../ComponentLibrayer/BasicButton';
import PageCategories from '../PageCategories';
import UploadPhoto from '../../../ComponentLibrayer/PhotoUploader';

const ProfileImage = styled.img`
    margin: 0;
    width: 10em;
    height: 10em;
    border-radius: 50%;
    display: block;
    border: #3c78d8 0.25em solid;
    object-fit: cover;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        margin: auto;
    }
`;

const TopBarContainer = styled.div`
    width: fit-content;
    margin: auto;
`;

const TopBarTopSection = styled.div`
    display: flex;
    justify-content: center;
    width: fit-content;
    margin: auto;
    height: fit-content;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        display: inline-block;
    }
`;

const TopBarTextContainer = styled.div`
    margin: auto 0;
    margin-left: 1em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        margin: 1em;
        text-align: center;
    }
`;

const TopBarText = styled.h1`
    font-size: 1.75em;
    font-family: "Times New Roman", Times, serif !important;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        font-size: 1.5em;
    }
`;

const EditButtonContianer = styled.div`
    position: relative;
    height: fit-content;
    margin: auto 0;
    margin-left: 3em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 100%;
        margin: 1em 0;
    }
`;

const MessageToUser = styled.h1`
    font-size: 1em;
    text-align: left;
    width: 30em;
    margin: 0;
    position: absolute;
    top: -0.5em;
    left: 0;
`;

const UpdateButtonContainer = styled.div`
    width: fit-content;
    height: fit-content;
    margin: auto 0;
    position: absolute;
    right: 2em;
    top: 0;
    left: 10em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        position: static;
        margin: auto;
    }
`;

const PageCategoryContainer = styled.div`
    width: 125%;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        width: 90%;
        margin: auto;
    }
`;

type Props = {
    profilePhoto: string,
    name: string,
    email: string,
    canEditMode: boolean,
    editMode: boolean,
    updateFunction: Function,
    messageToUser: string,
    switchEditMode: Function,
    allCategories: any,
    setAllCategories: any,
    categories: any,
    update: any,
    image: string
}

function UserPage(props: Props) {
    const [imageHash, setImageHash] = useState(0)
    const {image, profilePhoto, name, email, canEditMode, editMode, messageToUser, updateFunction, switchEditMode, allCategories, setAllCategories, categories} = props;
    
    const update = () => {
        props.update()
        setImageHash(Date.now())
    }

    return (
        <TopBarContainer>
            <TopBarTopSection>
                <ProfileImage src={`${image}?${imageHash}`} />
                <TopBarTextContainer>
                    <TopBarText>{name}</TopBarText>
                    <TopBarText>{email}</TopBarText>
                </TopBarTextContainer>
                {canEditMode ?
                    <EditButtonContianer>
                        <MessageToUser>{messageToUser}</MessageToUser>
                        <BasicButton activateButton={switchEditMode} text="edit" active={editMode} width={'5em'} id={20} />
                        {editMode ?
                            <UpdateButtonContainer>
                                <BasicButton activateButton={updateFunction} text="Update" active={!editMode} width={'5em'} id={20} />
                            </UpdateButtonContainer>
                            : ''}
                    </EditButtonContianer> : ''}
            </TopBarTopSection>
            <UploadPhoto update = {update} />
            <PageCategoryContainer>
                <PageCategories width = {"10em"} allCategories={allCategories} setAllCategories={setAllCategories} categories={categories} editMode={editMode} />
            </PageCategoryContainer>
        </TopBarContainer>
    );
}

export default UserPage;