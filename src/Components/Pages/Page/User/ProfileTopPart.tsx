import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BasicButton from '../../../ComponentLibrayer/BasicButton';
import PageCategories from '../PageCategories';
// import UploadPhoto from '../../../ComponentLibrayer/PhotoUploader';
import PhotoAndUploader from '../../../ComponentLibrayer/PhotoAndUploader'
import { useMediaQuery } from 'react-responsive';

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
    name: string,
    email: string,
    canEditMode: boolean,
    editMode: boolean,
    categories: any,
    allCategories: any,
    setAllCategories: any,
    update: any,
    image: string
}

function UserPage(props: Props) {
    const [imageHash, setImageHash] = useState(0)
    const { image, name, email, canEditMode, editMode, categories, allCategories, setAllCategories } = props;
    const isPhone = useMediaQuery({ minDeviceWidth: parseInt(process.env.REACT_APP_PHONE_BREAK, 10) })

    const update = () => {
        props.update()
        setImageHash(Date.now())
    }

    return (
        <TopBarContainer>
            <TopBarTopSection>
                <PhotoAndUploader size={"12.5em"} img={`${image}?${imageHash}`} update={update} canEdit={canEditMode} />
                <TopBarTextContainer>
                    <TopBarText>{name}</TopBarText>
                    <TopBarText>{email}</TopBarText>
                </TopBarTextContainer>
            </TopBarTopSection>
            <PageCategories justify_content = {"space"} margin = {!isPhone ? "auto" : "0"} width={"10em"} allCategories={allCategories} setAllCategories={setAllCategories} categories={categories} editMode={editMode} />
        </TopBarContainer>
    );
}

export default UserPage;