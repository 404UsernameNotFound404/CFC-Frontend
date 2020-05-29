import React, { useState } from 'react';
import styled from 'styled-components';
import ParaInput from '../../packages/para-input-react/ParaInput';
import DefaultImage from '../../../img/protest.jpg';
import UpdateEditButton from '../../packages/UpdateEditButton';

const Page = styled.div`
    padding-top: 5em;
    width: 65em;
    margin: auto;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        width: 95%;
    }
`;

const Title = styled.h1`
    margin: 0;
    margin-bottom: 0.1em;
`;

const BlackLine = styled.div`
    margin-bottom: 1em;
    width: 100%;
    height: 0.25em;
    background-color: black;
`;

const ParaTitle = styled.h2`
    text-align: center;
    width: 100%;
`;

const Image = styled.img`
    height: 40vh;
    width: 60%;
    object-fit: cover;
    margin: auto;
    display: block;
    border: black 0.4em solid;
    border-radius: 0.4em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        width: 90%;
        margin-top: 1em;
    }
`;

const TopContainer = styled.div`
    display: flex;
    height: fit-content;
    width: 100%;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        display: block;
    }
`;

const TopContainerText = styled.div`
    margin-left: 2%;
    width: 38%;
    height: fit-content;
    margin: auto 0;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        width: 100%;
        display: flex;
    }
`;

const WhereWhenTitle = styled.h1`
    text-align: center;
    text-decoration: underline;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        margin: 0;
        margin-top: 0.5em;
    }
`;

const WhereWhenText = styled.h2`
    text-align: center;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        margin: 0;
    }
`;

function EventPage() {
    const [title, setTitle] = useState("The Climate March");
    const [background, setBackground] = useState("This is a background on the event.This is a background on the event.This is a background on the event.This is a background on the event.This is a background on the event.This is a background on the event.");
    const [desc, setDesc] = useState("This is a desc.This is a desc.This is a desc.This is a desc.This is a desc.This is a desc.This is aThis is a desc.This is a desc. desc.This is a desc.This is a desc.This is a desc.This is a desc.This is a desc.This is a desc.");
    const [img, setImg] = useState(DefaultImage);
    const [where, setWhere] = useState("Parliament 152 wellington");
    const [when, setWhen] = useState("December 13th 9:00 to 10:00");
    const [update, setUpdate] = useState(false);
    const [canEdit, setCanEdit] = useState(true);

    return (
        <Page>
            {/* <UpdateEditButton canEdit={canEdit} update={update} switchFCN={() => { setUpdate(!update) }} /> */}
            <Title>{title}</Title>
            <BlackLine />
            <ParaInput width={"100%"} paragraphValue={desc} setParagraphValue={setDesc} editMode={update} title={"Description"} margin={"auto"} />
            <TopContainer>
                <Image src={img} />
                <TopContainerText>
                    <div>
                        <WhereWhenTitle>Where</WhereWhenTitle>
                        <WhereWhenText>{where}</WhereWhenText>
                    </div>
                    <div>
                        <WhereWhenTitle>When</WhereWhenTitle>
                        <WhereWhenText>{when}</WhereWhenText>
                    </div>
                </TopContainerText>
            </TopContainer>
            <ParaInput width={"100%"} paragraphValue={background} setParagraphValue={setBackground} editMode={update} title={"Background Of Event"} margin={"auto"} />
        </Page>
    )
}

export default EventPage;