import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BasicButton from '../../ComponentLibrayer/BasicButton';
import PageCategories from './PageCategories';

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
    width: fit-content;
    margin: auto;
`;

const TopBarTopSection = styled.div`
    display: flex;
    justify-content: center;
    width: fit-content;
    margin: auto;
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

const EditButtonContianer = styled.div`
    position: relative;
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
    text-align: left;
    width: 25em;
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
}

function UserPage(props: Props) {
    const {profilePhoto, name, email, canEditMode, editMode, messageToUser, updateFunction, switchEditMode, allCategories, setAllCategories, categories} = props;

    return (
        <TopBarContainer>
            <TopBarTopSection>
                <ProfileImage src={profilePhoto} />
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
            <PageCategories allCategories={allCategories} setAllCategories={setAllCategories} categories={categories} editMode={editMode} />
        </TopBarContainer>
    );
}

export default UserPage;