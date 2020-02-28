import React, { useState } from 'react';
import styled from 'styled-components';
import PageCategories from '../../Page/PageCategories';

const Container = styled.div`
    position: relative;
    border: black 0.2rem solid;
    background-color: #f9f9f9;
    width: 27%;
    padding: 1%;
    margin: 0.5%;
    border-radius: 1em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        border-width: 1%;
        width: 90%;
        margin: 1.5em 0;
        padding: 4%;
    }
    transition: all 1s;
`;

const Name = styled.h1`
    font-size: 1.75em;
    margin: 0.1em 0;
    width: 60%;
    height: 3.8em;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* number of lines to show */
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        font-size: 1.5em;
    }
`;

const LogoOfOrg = styled.img`
    position: absolute;
    border: black thin solid;
    border-radius: 0.1em;
    width: 7em;
    height: 7em;
    margin: 1em auto;
    display: block;
    top: 0;
    right: 1em;
    object-fit: cover;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 5em;
        height: 5em;
    }
`;

const Location = styled.h1`
    font-size: 1.25em;
    height: 1.5em;
    width: 90%;
    margin: 0;
    font-weight: 400;
`;

type DescProps = {
    showAll: boolean
}

const Desc = styled.p<DescProps>`
    font-size: 1em;
    width: 90%;
    margin-top: 0.25em;
    margin-bottom: 0.5em;
    height: ${p => p.showAll ? 'auto' : '4em'};
    overflow:  ${p => p.showAll ? 'visible' : 'hidden'};
    text-overflow: ${p => p.showAll ? 'none' : 'ellipsis'};;
    display: ${p => p.showAll ? 'block' : '-webkit-box'};
    -webkit-box-orient: ${p => p.showAll ? '' : 'vertical'};
    -webkit-line-clamp: ${p => p.showAll ? '99' : '3'};
`;

const SeeMore = styled.h4`
    color: #007aa2;
    font-size: 1em;
    margin: 0;
    width: fit-content;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const LinkToWebite = styled.a`
    font-size: 1.25em;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const Email = styled.textarea`
    font-size: 1.25em;
    margin: 0;
    background-color: none !important; 
    border: none;
    font-family: 'Cormorant Garamond', serif;
    width: 100%;
    height: 1.5em;
    resize: none;
    overflow: hidden;
    text-overflow: ellipsis;
    background-color: transparent;
`;

const CopyEmail = styled.div`
    margin: 0.5em 0;
    width: 6em;
    text-align: center;
    padding: 0.em 0;
    background-color: lightgray;
    border: solid thin darkgrey;
    cursor: pointer;
    user-select: none;
    &:hover {
        background-color: #b2b2b2;
    }
    &:active {
        background-color: gray;
    }
`;

const GhostToFocus = styled.textarea`
    position: absolute;
    left: -90000px;
`;

const CopyButtonContainer = styled.div`
    display: flex;
`;

type CopyMessageProps = {
    color: string
}

const CopyMessage = styled.h4<CopyMessageProps>`
    margin: auto 0;
    margin-left: 0.5em;
    font-size: 1.1em;
    color: ${p => p.color};
    transition: all 0.5s ease;
    opacity: 0;
`;

type Props = {
    name: string,
    desc: string,
    link: string,
    location: string,
    interests: { Name: string, Colour: string, ID: string }[],
    image: string,
    email: string
}

function Organzation(props: Props) {
    const [seeMore, setSeeMore] = useState(false);
    const [textToCopy, setTextToCopy] = useState();
    const [ghostText, setGhostText] = useState();
    const [copyMessage, setCopyMessage] = useState({message: '', color: 'red'})
    const specificID = "super-long-never-going-to-be-the-same-as-someone-else-1234-asd-123-asdcvxvxgfdg-5940" + props.email;

    const copyEmail = async (e: any) => {
        //selecting email ele
        textToCopy.select();
        await document.execCommand('copy');
        //selecting a div way outside of view so the email is not visually every highlighted
        ghostText.select();
        setCopyMessage({message: "Copied Email", color: "black"})
        //animation for copied message
        let copyMessage = document.getElementById(specificID);
        copyMessage.style.opacity = '1';
        setTimeout(() => {
            let copyMessage = document.getElementById(specificID);
            copyMessage.style.opacity = '0';
        }, 2000)
    }

    return (
        <Container>
            <Name>{props.name}</Name>
            <Location>{props.location.length >= 30 ? (props.location.substring(0, 30) + "...") : props.location}</Location>
            <form>
                <GhostToFocus readOnly ref={(ref) => { setGhostText(ref) }} id="org-card-ghost">Shhhhhh</GhostToFocus>
                <Email readOnly ref={(ref) => { setTextToCopy(ref) }} >{props.email}</Email>
            </form>
            <CopyButtonContainer>
                <CopyEmail onClick={copyEmail}>Copy Email</CopyEmail>
                <CopyMessage color = {copyMessage.color} id = {specificID}>{copyMessage.message}</CopyMessage>
            </CopyButtonContainer>
            <Desc showAll = {seeMore}>{props.desc.length >= 100 && !seeMore ? (props.desc.substring(0, 100) + "...") : props.desc}</Desc>
            {props.desc.length >= 100 ? <SeeMore onClick={() => { setSeeMore(!seeMore) }}>See More</SeeMore> : <div style={{ height: '1.3em' }}></div>}
            <LinkToWebite href={props.link}>{props.link.length >= 35 ? (props.link.substring(0, 35) + "...") : props.link}</LinkToWebite>
            <LogoOfOrg src={props.image} />
            <PageCategories allCategories = {[]} setAllCategories = {null} editMode={false} categories={props.interests} width={"100%"} />
        </Container>
    );
}

export default Organzation;
