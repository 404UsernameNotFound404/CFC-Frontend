import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { getSearchData } from '../../packages/search-page-functions/getSearchData';
import { AppContext } from '../../../Context/AppContext';
import OrganizationCard from '../../packages/organization-card-react/organizationsCard';

const Component = styled.div`
    width: 90% !important;
    width: fit-content;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 100% !important;
        display: inline-block;
    }
    margin-bottom: 5em;
`;

type Props = {
    categoriesToShow: number[];
}

function Organizations(props: Props) {
    const c = useContext(AppContext)
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        const getOrgs = async () => {
            const orgsData = await getSearchData("Organizations");
            console.log(orgsData)
            if (orgsData.error != undefined) console.log("error");//TODO
            else setOrganizations(orgsData);
        }
        getOrgs();
    }, [])

    if (organizations.length != 0) {
        return (
            <Component>
                {
                    organizations.map(ele => <OrganizationCard {...ele}  />)
                }
            </Component>
        );
    } else {
        return <>Loading...</>
    }
}

export default Organizations;