import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../Context/AppContext';
import Cookie from 'js-cookie'
import LoadingPage from '../../ComponentLibrayer/LoadingPage';
import { Redirect } from 'react-router';
import DefaultPhoto from '../../../img/default.jpg';
import PhotoAndUploader from '../../ComponentLibrayer/PhotoAndUploader'


const axios = require("axios")

const Page = styled.div`
    width: 75em;
    margin: auto;
    height: 100vh;
    display: flex;
    justify-content: center;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        width: 100%;
    }
`;

const PageContent = styled.div`
    background-color: #a4c2f4;
    border-radius: 1em;
    padding: 5% 6%;
    height: 20em;
    width: fit-content;
    margin: auto;
    display: flex;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        display: block;
        width: 100%;
        background-color: transparent;
    }
`;

const Content = styled.div`
    width: fit-content;
    margin: auto 0;
    margin-left: 3em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        margin-left: 0;
        width: 100%;
    }
`;

const Name = styled.h2`
    font-size: 2.5em;
    margin: 0;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        text-align: center;
        font-size: 2em;
    }
`;

const Email = styled.h2`
    font-size: 2.5em;
    margin: 0;
    margin-bottom: 0.5em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        text-align: center;
        font-size: 1.6em;
    }
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
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        margin: 1em auto;
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
    const [redirectToHome, setRedirectToHome] = useState(false);

    useEffect(() => {
        fetchAPI()
    }, []);

    const fetchAPI = async () => {
        try {
            if (c.userToken.length <= 1) throw "User not logged in"
            const resRaw = await fetch(`${process.env.REACT_APP_BASEURL}/activist/${props.userID}`, {
                method: "GET",
                headers: {
                    "Authorization": c.userToken
                }
            });
            const res = await resRaw.json();
            console.log(res)
            const { Name, Email, Image } = res;
            setName(Name);
            setEmail(Email);
            setImageSRC(Image);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setRedirectToHome(true);
        }
    }

    const deleteAccount = async () => {
        try {
            let res = await axios.delete(`${process.env.REACT_APP_BASEURL}/user`, JSON.stringify({}), { headers: { "Authorization": c.userToken } });
            console.log(res)
            setRedirectToHome(true);
            Cookie.set("authToken", "");
            c.setLoggedIn(false);
        } catch (err) {
            console.log(err);
        }
    }

    if (!loading) {
        return (
            <Page>
                {redirectToHome ? <Redirect to="/home" /> : ''}
                <PageContent>
                    <PhotoAndUploader update={fetchAPI} canEdit={true} size="20em" img={imageSRC == undefined ? DefaultPhoto : imageSRC} />
                    <Content>
                        <Name>{name}</Name>
                        <Email>{email}</Email>
                        <DeleteButton onClick={deleteAccount}>Delete Account</DeleteButton>
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