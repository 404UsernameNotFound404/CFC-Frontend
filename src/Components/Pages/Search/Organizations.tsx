import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { getSearchData } from '../../packages/search-page-functions/getSearchData';
import { AppContext } from '../../../Context/AppContext';
import OrganizationCard, { ActionButtonProps } from '../../packages/organization-card-react/organizationsCard';
import { checkIfInCategories } from '../../packages/search-page-functions/checkIfHasCategories';

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

const RequestModalButtonStyle = styled.div`

`;

const RequestModalButton = (props: ActionButtonProps) => {
    return (
        <RequestModalButtonStyle onClick={() => { props.ActionButtonOnClick(props.id) }}>Request Change</RequestModalButtonStyle>
    );
}

function Organizations(props: Props) {
    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        const getOrgs = async () => {
            const orgsData = await getSearchData("Organizations");
            if (orgsData.error != undefined) console.log("error");//TODO
            else setOrganizations(orgsData);
        }
        getOrgs();
    }, []);

    const openModal = (orgId: string) => {
        console.log("open " + orgId);
    }

    if (organizations.length != 0) {
        return (
            <Component>
                {
                    organizations.map(ele => checkIfInCategories(ele.interests, props.categoriesToShow) && <OrganizationCard ActionButton={RequestModalButton} ActionButtonOnClick={openModal} {...ele} />)
                }
                
            </Component>
        );
    } else {
        return <>Loading...</>
    }
}

export default Organizations;