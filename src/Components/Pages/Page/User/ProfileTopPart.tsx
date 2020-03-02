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

const ContactButton = styled.div`
    background-color: #3c78d8;
    text-align: center;
    padding: 0.2em 0;
    font-size: 1.5em;
    color: white;
    width: 8em;
    border-radius: 0.5em;
    cursor: pointer;
    &:hover {
        color: white;
        background-color: #1e4b97;
    }
`;

type Props = {
    name: string,
    canEditMode: boolean,
    editMode: boolean,
    categories: any,
    allCategories: any,
    setAllCategories: any,
    update: any,
    image: string,
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function UserPage(props: Props) {
    const [imageHash, setImageHash] = useState(0)
    const { image, name, canEditMode, editMode, categories, allCategories, setAllCategories } = props;
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
                    {!canEditMode ? <ContactButton onClick = {() => props.setModalOpen(true)}>Message</ContactButton> : ''}
                </TopBarTextContainer>
            </TopBarTopSection>
            <PageCategories justify_content = {"space"} margin = {!isPhone ? "auto" : "0"} width={"10em"} allCategories={allCategories} setAllCategories={setAllCategories} categories={categories} editMode={editMode} />
        </TopBarContainer>
    );
}

export default UserPage;