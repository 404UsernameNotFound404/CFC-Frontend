import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import Org from '../Search/SearchResultCards/Organzation';
import { AppContext } from '../../../Context/AppContext';

const axios = require("axios");

const Component = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`;

const DecisionContainer = styled.div`
    height: 100%;
`;

type DecisionButtonProps = {
    colour: string
}

const DecisionButton = styled.div<DecisionButtonProps>`
    width: 6em;
    height: 6em;
    color: white;
    line-height: 6em;
    text-align: center;
    border-radius: 50%;
    background-color: ${p => p.colour};
    margin-top: 5em;
    cursor: pointer;
    &:hover {
        color: black;
    }
`;

const OrgContainer = styled.div`
    width: 30%;
    margin-right: 4%;
`;

const OrgTitle = styled.h3`
    font-size: 1.5em;
    margin: 0.5em 0;
`;

type Props = {
    orgID: string
    name: string,
    location: string,
    email: string,
    desc: string,
    link: string,
    id: string,
    delReq: boolean,
    interests: { Name: string, ID: string, Colour: number }[],
}

function Request(props: Props) {
    const { name, location, email, desc, link, interests, orgID } = props;
    const [oldData, setOldData] = useState(null);
    const c = useContext(AppContext);

    useEffect(() => {
        fetchAPI();
    }, [])

    const fetchAPI = async () => {
        try {
            let resRaw = await fetch(`${process.env.REACT_APP_BASEURLNODE}/organization/${orgID}`, {
                method: "GET",
                headers: {
                    "Authorization": c.userToken
                }
            })
            const res = await resRaw.json();
            setOldData(res)
        } catch (err) {

        }
    }

    const makeDecision = async (approve: boolean) => {
        try {
            let res = await axios.put(`${process.env.REACT_APP_BASEURLNODE}/organization/${props.id}`, { approve: approve },{
                headers: {
                    "Authorization": c.userToken
                }
            })
            console.log(res)
            if (!!res.error) throw res.error;
            fetchAPI();
            c.setMessageToUser({ message: "NOTHING BROKE YASSS", colour: "green" });
        } catch (err) {
            console.log(err)
            if (typeof err == "string") {
                c.setMessageToUser({ message: err, colour: "red" });
            }
            c.setMessageToUser({ message: "ERROR YOU STUPID STUPID PERSON AHHHH", colour: "red" });
            fetchAPI();
        }
    }

    if (oldData == null) {
        return <Component>LOADING</Component>
    } else {
        return (
            <Component>
                <OrgContainer>
                    <OrgTitle>New</OrgTitle>
                    <Org width={"100%"} id={"penis"} image={""} name={name} location={location} email={email} desc={desc} link={link} interests={interests as any} />
                </OrgContainer>
                <OrgContainer>
                    <OrgTitle>Old</OrgTitle>
                    {!props.delReq ? <Org width={"100%"} id={"penis"} image={""} name={oldData.name} location={oldData.location} email={oldData.email} desc={oldData.desc} link={oldData.link} interests={oldData.interests as any} /> : "DELETE"}
                </OrgContainer>
                <DecisionContainer>
                    <DecisionButton onClick={() => { makeDecision(true) }} colour={"green"}>Approve</DecisionButton>
                    <DecisionButton onClick={() => { makeDecision(false) }} colour={"red"}>Disapprove</DecisionButton>
                </DecisionContainer>
            </Component>
        );
    }
}

export default Request;