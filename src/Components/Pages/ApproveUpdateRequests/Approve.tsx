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
            console.log(process.env.REACT_APP_BASEURLNODE)
            console.log(c.userToken)
            let resRaw = await fetch(`${process.env.REACT_APP_BASEURLNODE}/organization/request`, {
                method: "GET",
                headers: {
                    "authorization": c.userToken
                }
            })
            const res = await resRaw.json();
            console.log(res);
            setRequests(res)
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <Page>
            {console.log(requests)}
            {
                requests.map(ele => <Request id = {ele._id} delReq = {ele.deleteReq} orgID = {ele.orgID} name = {ele.name} email = {ele.email} location = {ele.location} link = {ele.location} desc = {ele.desc} interests = {ele.interests} />)
            }
            {requests.length == 0 ? "NONE" : ""}
        </Page>
    )
}

export default Approve;