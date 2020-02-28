import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import { AppContext } from "../../Context/AppContext";

const axios = require("axios")

const Form = styled.form`
    width: 0;
    height: 0;
`;

const Content = styled.div`
    width: fit-content;
    margin: 1em 0;
    display: flex;
    height: 3em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        margin: 0.5em auto;
        width: 90%;
        display: block;
        height: fit-content;
    }
`;

const GhostInput = styled.input``;

const UploadButton = styled.div`
    background-color: green;
    padding: 0.5em 0;
    width: 12em;
    text-align: center;
    color: white;
    margin: 0;
    height: fit-content;
    margin: auto 0;
    cursor: pointer;
    &:hover {
        background-color: darkgreen;
    }
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        margin: auto 0;
        margin-left: 1em;
        width: 60%;
        margin: auto;
        padding: 0.5em 0;
        height: 90%;
        flex: 1;
    }
`;

type Props = {
    update: any
}

function UserPage(props: Props) {
    const c = useContext(AppContext);
    const randID = "Math.random().toString(36).substring(12)asdasdasdas123123vxvcasd";

    const checkFileExtension = (filename: string) => {
        var parts = filename.split('.');
        let fileExtension = parts[parts.length - 1].toUpperCase();
        if (fileExtension == "JPG" || fileExtension == "PNG") {
            return true
        }
        return false
    }

    const uploadThePhotoButtonPressed = async (file: any) => {
        c.setMessageToUser({ message: "Loading", colour: "black" })
        let formData = new FormData()
        formData.append('image', file)
        try {
            let res = await axios({
                url: `${process.env.REACT_APP_BASEURL}/setProfilePhoto`,
                method: "POST",
                headers: {
                    authorization: c.userToken
                },
                data: formData
            });
            if (res.data.Valid.length > 2) {
                c.setMessageToUser({ message: "Uploaded", colour: "green" })
                props.update();
            }
        } catch (err) {
            c.setMessageToUser({ message: "Failed To Upload Try Again", colour: "red" })
        }
    }

    const getFileToUpload = (e: any) => {
        e.preventDefault();
        const { files } = e.target;
        if (files.length == 1 && checkFileExtension(files[0].name) && files[0].size < 100000000) {
            uploadThePhotoButtonPressed(files[0])
            c.setMessageToUser({message: "Uploading", colour: "black"})
        } else {
            c.setMessageToUser({ message: "Invalid File", colour: "red" })
        }
    }

    const uploadButton = (e: any) => {
        e.preventDefault();
        const getFileUpload = document.getElementById(randID);
        getFileUpload.click();
    }

    return (
        <>
            <Form>
                <div style={{ height: '0', overflow: 'hidden' }}>
                    <GhostInput id={randID} type="file" onChange={getFileToUpload} accept="image/*" data-sigil="photo-input"></GhostInput>
                </div>
            </Form>
            <Content>
                <UploadButton onClick={uploadButton}>Upload A Profile Photo</UploadButton>
            </Content>
        </>
    );
}

export default UserPage;
