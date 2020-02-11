import React, { useState } from 'react';
import styled from 'styled-components';
import ParaInput from '../Page/ParaInput';

const Page = styled.div`
    padding-top: 4em;
    width: 65em;
    margin: auto;
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
    width: 80%;
    object-fit: cover;
    margin: auto;
    display: block;
`;

function EventPage() {
    const [title, setTitle] = useState("Title");
    const [background, setBackground] = useState("This is a background on the event.This is a background on the event.This is a background on the event.This is a background on the event.This is a background on the event.This is a background on the event.");
    const [desc, setDesc] = useState("This is a desc.This is a desc.This is a desc.This is a desc.This is a desc.This is a desc.This is aThis is a desc.This is a desc. desc.This is a desc.This is a desc.This is a desc.This is a desc.This is a desc.This is a desc.");
    const [img, setImg] = useState("");
    
    return (
        <Page>
            {console.log("right thing rendering")}
            <Title>{title}</Title>
            <BlackLine />
            <Image src = {img} />
            <ParaTitle>Description</ParaTitle>
            <ParaInput width = {"100%"} paragraphValue = {desc} setParagraphValue = {(e: any) => {setDesc(e.target.value)}} editMode = {false} title = {""} margin = {"auto"} />
            <ParaTitle>Background Of Event</ParaTitle>
            <ParaInput width = {"100%"} paragraphValue = {background} setParagraphValue = {(e: any) => {setBackground(e.target.value)}} editMode = {false} title = {""} margin = {"auto"} />
        </Page>
    )
}

export default EventPage;