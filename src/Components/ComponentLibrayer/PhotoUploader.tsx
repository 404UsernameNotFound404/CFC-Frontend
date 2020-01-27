import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { UploadPhoto } from './PhotoUploadingFunctions';
import Cookie from 'js-cookie';

const axios = require("axios")

const Component = styled.form`
    width: fit-content;
    margin: 1em 0;
    margin-left: 2.5%;
    @media (max-width: 768px) {
        margin: 0.5em auto;
        width: 90%;
        display: flex;
    }
`;

const Button = styled.input`
    padding: 0.25em;
    width: 100%;
    border: black thin solid;
    background-color: transparent;
    font-size: 1em;
    @media (max-width: 768px) { 
        width: 100%;
        flex: 4;
    }
`;

const UploadButton = styled.button`
    margin-top: 0.5em; 
    padding: 0.25em;
    width: fit-content;
    border: black thin solid;
    background-color: transparent;
    @media (max-width: 768px) {
        margin: auto 0;
        margin-left: 1em;
        width: 10%;
        height: 90%;
        flex: 1;
    }
`;

type MessageToUserProps = {
    colour: string
}

const MessageToUser = styled.h4<MessageToUserProps>`
    margin: 0;
    width: 100%;
    font-size: 1em;
    color: ${p => p.colour};
`;

type Props = {
    update: any
}

function UserPage(props: Props) {
    const [file, setFile] = useState('')
    const [messageToUser, setMessageToUser] = useState({ text: "", colour: "black" })

    const checkFileExtension = (filename: string) => {
        var parts = filename.split('.');
        let fileExtension = parts[parts.length - 1].toUpperCase();
        if (fileExtension == "JPG" || fileExtension == "PNG") {
            return true
        }
        return false
    }

    const uploadThePhotoButtonPressed = async (e: any) => {
        e.preventDefault();
        setMessageToUser({ text: "Loading", colour: "black" })
        let formData = new FormData()
        formData.append('image', file)
        try {
            let res = await axios({
                url: `${process.env.REACT_APP_BASEURL}/setProfilePhoto`,
                method: "POST",
                headers: {
                    authorization: Cookie.get("authToken")
                },
                data: formData
            });
            if (res.data.Valid.length > 2) {
                setMessageToUser({ text: "Uploaded", colour: "green" })
                props.update();
            }
        } catch (err) {
            setMessageToUser({ text: "Failed To Upload Try Again", colour: "red" })
        }
    }

    const onChangePhoto = (e: any) => {
        e.preventDefault();
        const { files } = e.target;
        if (files.length == 1 && checkFileExtension(files[0].name) && files[0].size < 15000000) {
            setFile(files[0])
        } else {
            setMessageToUser({ text: "Invalid File", colour: "red" })
        }
        setFile(files[0])
    }

    return (
        <Component onSubmit={uploadThePhotoButtonPressed}>
            <Button type="file" onChange={onChangePhoto} accept="image/*" data-sigil="photo-input" />
            <UploadButton type="submit">Upload</UploadButton>
            {/* <MessageToUser colour={messageToUser.colour}>{messageToUser.text}</MessageToUser> */}
        </Component>
    );
}

export default UserPage;
