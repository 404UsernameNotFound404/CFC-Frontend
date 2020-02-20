import React, { useState, useEffect } from 'react';
import ActivistPage from '../Search/SearchResultCards/Page';
import styled from 'styled-components';
import LoadingPage from '../../ComponentLibrayer/LoadingPage';
import DefaultPhoto from '../../../img/default.jpg'

const Component = styled.div`
    width: 100%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        display: block;
    }
`;

function TeamSection() {
    const [teamMemberData, setTeamMemberData] = useState([
        { role: "Co-Founder", id: "1WwyaMUaPRl8bkEA3hoqHOyg87C" },
        { role: "Co-Founder", id: "1WxtVNFM64F102yBb1BBFeltKWo" },
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAPI();
    }, [])

    const fetchAPI = async () => {
        try {
            let allRes = await Promise.all(teamMemberData.map(ele => {
                return getATeamMember(ele.id, ele.role)
            }))
            setTeamMemberData(allRes);
            setLoading(false);
        } catch (err) { }
        //consider error handling
    }

    const getATeamMember = async (id: string, role: string) => {
        const resRaw = await fetch(`${process.env.REACT_APP_BASEURL}/activist/${id}`, {
            method: "GET"
        })
        let res = await resRaw.json();
        res = { ...res, role: role, id: id }
        return res
    }
    if (!loading) {
        return (
            <Component>
                {
                    teamMemberData.map((ele: any, i: number) => <ActivistPage width={"30%"} name={ele.Name} ID={ele.id} Categories={ele.Categories} image={ele.Image.length <= 1 ? DefaultPhoto : ele.Image} para={ele.Para1} key = {i} />)
                }
            </Component>
        )
    } else {
        return (
            <LoadingPage />
        )
    }
}

export default TeamSection;