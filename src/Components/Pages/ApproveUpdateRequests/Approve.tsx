import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../Context/AppContext';
import Request from './SingleRequest';

const Page = styled.div`
    padding-top: 5em;
    width: 70em;
    margin: auto;
`;

function Approve() {
    const [requests, setRequests] = useState([]);
    const c = useContext(AppContext);

    useEffect(() => {
        fetchAPI();
    }, [])

    const fetchAPI = async () => {
        try {
            let resRaw = await fetch(`${process.env.REACT_APP_BASEURLNODE}/organization/request`, {
                method: "GET",
                headers: {
                    "Authorization": c.userToken
                }
            })
            const res = await resRaw.json();
            setRequests(res)
        } catch(err) {

        }
    }

    return (
        <Page>
            {console.log(requests)}
            {
                requests.map(ele => <Request id = {ele._id} orgID = {ele.data.orgID} name = {ele.data.name} email = {ele.data.email} location = {ele.data.location} link = {ele.data.location} desc = {ele.data.desc} interests = {ele.data.interests} />)
            }
        </Page>
    )
}

export default Approve;