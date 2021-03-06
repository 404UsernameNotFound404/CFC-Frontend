import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from "../../Context/AppContext";
import DefaultPhoto from '../../img/default.jpg';

const axios = require("axios");

const Component = styled.div`
    width: fit-content;
    height: fit-content;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        width: 100%;
    }
`;

const Form = styled.form`
    width: 0;
    height: 0;
`;

const Content = styled.div`
    width: fit-content;
    margin: auto;
    display: flex;
    height: fit-content;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        margin: 0.5em auto;
        width: 100%;
        display: block;
        height: fit-content;
    }
`;

const GhostInput = styled.input``;

type PropsUploadButton = {
    color: string,
    darkColor: string,
    opacity: number
}

const UploadButton = styled.div<PropsUploadButton>`
    background-color: ${p => p.color};
    padding: 0.5em 0;
    width: 80%;
    height: 20%;
    text-align: center;
    color: white;
    margin: 18% auto;
    cursor: pointer;
    transition: opacity 0.5s;
    opacity: ${p => p.opacity};
    font-size: 90%;
    &:hover {
        background-color: ${p => p.darkColor};
    }
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        display: block;
        width: 80%;
        margin: 3.25em auto;
        padding: 0.4em 0;
        font-size: 0.9em;
        height: 90%;
        flex: 1;
        opacity: 1;
    }
`;

type PhotoImageProps = {
    img: string,
    size: string
}

const PhotoImage = styled.div<PhotoImageProps>`
    margin: 0;
    width: ${p => p.size};
    height: ${p => p.size};
    border-radius: 50%;
    background-size: cover;
    background-image: url(${p => p.img});
    background-position: center;
    display: flex;
    border: #3c78d8 0.25em solid;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        margin: auto;
    }
`;

const UploadAndDeleteButtons = styled.div`
    width: 100%;
    height: fit-content;
    margin: auto;
`;

type Props = {
    img: string,
    update: any,
    canEdit: boolean,
    size: string
}

function PhotoUnloader(props: Props) {
    const [uploadOpacity, setUploadOpacity] = useState(0.2);
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
        c.setMessageToUser({ message: "Loading", colour: "black" });
        let formData = new FormData()
        formData.append('image', file)
        try {
            let res = await axios({
                url: `${process.env.REACT_APP_BASEURL}/user/photo`,
                method: "PUT",
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
            c.setMessageToUser({ message:"Failed To Upload Try Again", colour: "red" })
        }
    }

    const getFileToUpload = (e: any) => {
        e.preventDefault();
        const { files } = e.target;
        if (files.length == 1 && checkFileExtension(files[0].name) && files[0].size < 100000000) {
            uploadThePhotoButtonPressed(files[0])
            c.setMessageToUser({ text: "Uploading", colour: "black" })
        } else {
            c.setMessageToUser({ text: "Invalid File", colour: "red" })
        }
    }

    const uploadButton = (e: any) => {
        e.preventDefault();
        const getFileUpload = document.getElementById(randID);
        getFileUpload.click();
    }

    const deleteProfilePhoto = async (e: any) => {
        try {e.preventDefault() } catch(err) {}
        try {
            c.setMessageToUser({ message: "Deleting Photo", colour: "black" })
            let res = await axios({
                url: `${process.env.REACT_APP_BASEURL}/user/photo`,
                method: "DELETE",
                headers: {
                    authorization: c.userToken
                }
            });
            if (res.data.Error != undefined) throw "Failed to delete Photo"
            c.setMessageToUser({ message: "Deleted Photo", colour: "green" })
            props.update();
        } catch (err) {
            if (typeof err == 'string') {
                c.setMessageToUser({ message: err, colour: "red" })
                return
            }
            c.setMessageToUser({ message: "Error Deleting Photo", colour: "red" })
        }
    }


    return (
        <Component>
            <Form onSubmit = {(e: any) => {e.preventDefault()}}>
                <div style={{ height: '0', overflow: 'hidden' }}>
                    <GhostInput id={randID} type="file" onChange={getFileToUpload} accept="image/*" data-sigil="photo-input"></GhostInput>
                </div>
            </Form>
            <Content>
                <PhotoImage size={props.size} img={props.img == undefined || props.img.length <= 1 ? DefaultPhoto: props.img}>
                    {
                        props.canEdit ?
                            <UploadAndDeleteButtons onMouseOver={() => { setUploadOpacity(1) }} onMouseLeave={() => { setUploadOpacity(0.2) }}>
                                <UploadButton opacity={uploadOpacity} color={"green"} darkColor={"darkgreen"} onClick={uploadButton}>Upload A Profile Photo</UploadButton>
                                <UploadButton opacity={uploadOpacity} color={"red"} darkColor={"darkred"} onClick={deleteProfilePhoto}>Delete Profile Photo</UploadButton>
                            </UploadAndDeleteButtons>
                            : ''
                    }
                </PhotoImage>
            </Content>
        </Component>
    )
}

export default PhotoUnloader;