import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import PhotoUploader from '../../ComponentLibrayer/PhotoUploader'
import { BASEURL } from '../../../Constants'
import { AppContext } from '../../../Context/AppContext';
import Cookie from 'js-cookie'
import LoadingPage from '../../ComponentLibrayer/LoadingPage';
import { Redirect } from 'react-router';


const axios = require("axios")

const Page = styled.div`
    width: 75em;
    height: 100vh;
    display: flex;
    justify-content: center;
`;

const PageContent = styled.div`
    height: 20em;
    width: fit-content;
    margin: auto;
    display: flex;
`;

const Content = styled.div`
    width: fit-content;
    margin: auto 0;
    margin-left: 3em;
`;

const ProfileImage = styled.img`
    object-fit: cover;
    height: 20em;
    width: 20em;
    border-radius: 50%;
`;

const Name = styled.h2`
    font-size: 2.5em;
    margin: 0;
`;

const Email = styled.h2`
    font-size: 2.5em;
    margin: 0;
`;

const DeleteButton = styled.div`
    width: 8em;
    padding: 0.5em 0;
    background-color: red;
    text-align: center;
    color: white;
    border-radius: 0.2em;
    cursor: pointer;
    &:hover {
        background-color: #d61010;
    }
`;

type Props = {
    userID: string
}

function ProfilePage(props: Props) {
    const c = useContext(AppContext)
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [imageSRC, setImageSRC] = useState("")
    const [redirectToHome, setRedirectToHome] = useState(false)

    useEffect(() => {
        fetchAPI()
    }, [])

    const updateProfileImage = () => {
        window.location.reload();
    }

    const fetchAPI = async () => {
        const res = await axios.post(`${BASEURL}/checkIsOwner`, JSON.stringify({ PageID: props.userID }), { headers: { "Authorization": Cookie.get("authToken") } });
        const { Name, Email, Image } = res.data;
        setName(Name);
        setEmail(Email)
        setImageSRC(Image)
        setLoading(false);
    }

    const deleteAccount = async () => {
        await axios.post(`${BASEURL}/deleteAccount`, JSON.stringify({}), { headers: { "Authorization": Cookie.get("authToken") } });
        setRedirectToHome(true);
        Cookie.set("authToken", "")
        c.setLoggedIn(false);
    }
    
    if (!loading) {
        return (
            <Page>
                {redirectToHome ? <Redirect to = "/home" /> : ''}
                <PageContent>
                    <ProfileImage src={imageSRC} />
                    <Content>
                        <Name>{name}</Name>
                        <Email>{email}</Email>
                        <PhotoUploader update={updateProfileImage} />
                        <DeleteButton onClick = {deleteAccount}>Delete Account</DeleteButton>
                    </Content>
                </PageContent>
            </Page>
        )
    } else {
        return (
            <LoadingPage />
        )
    }
}
export default ProfilePage