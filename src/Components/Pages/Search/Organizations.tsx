import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { getSearchData } from '../../packages/search-page-functions/getSearchData';
import { AppContext } from '../../../Context/AppContext';
import OrganizationCard, { ActionButtonProps } from '../../packages/organization-card-react/organizationsCard';
import { checkIfInCategories } from '../../packages/search-page-functions/checkIfHasCategories';
import Modal from '../../packages/modal-react';
import CreatingEditingOrg from '../../packages/organization-card-react/creatingEditingOrgs';

const Component = styled.div`
    width: 100%;
`;

const Para = styled.p`
    font-size: 1.5rem;
    text-align: center;
`;

const CreateOrgButton = styled.div`
    width: fit-content;
    border-radius: 0.5em;
    padding: 0.5em 1em;
    background-color: #3c78d8;
    margin-bottom: 1em;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #183e7c;
    }
`;

const OrganizationContainer = styled.div`
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
    width: fit-content;
    padding: 0.5em 0.75em;
    color: #3c78d8;
    border-radius: 0.3em;
    /* background-color: #3c78d8; */
    border: thin solid #3c78d8;
    cursor: pointer;
    font-size: 1em;
    &:hover {
        color: #183e7c;
        background-color: #3c78d81f;
        border-color: #183e7c;
    }
`;

const RequestModalButton = (props: ActionButtonProps) => {
    return (
        <RequestModalButtonStyle onClick={() => { props.ActionButtonOnClick(props.id) }}>Request Change</RequestModalButtonStyle>
    );
}

function Organizations(props: Props) {
    const [organizations, setOrganizations] = useState([]);
    const [modalData, setModalData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getOrgs();
    }, []);

    const getOrgs = async () => {
        setLoading(true);
        const orgsData = await getSearchData("Organizations");
        if (orgsData.error != undefined) console.log("error");//TODO
        else setOrganizations(orgsData);
        setLoading(false);
    }

    const openModal = (orgId: string) => setModalData(organizations.find(ele => ele._id == orgId));

    const createModal = () => setModalData({create: true});

    const closeModal = () => setModalData(null);

    const closeModalAndRefresh = () => {
        console.log("hello this should be working")
        closeModal();
        getOrgs();
    }

    if (organizations.length != 0 && !loading) {
        return (
            <Component>
                <Para>We do not yet have contacts with all the organizations on our list. We have compiled this list to help activists find organizations. If you do not see an organization on our list, please add it. </Para>
                <CreateOrgButton onClick={createModal}>Enter An Organization</CreateOrgButton>
                <OrganizationContainer>
                    {
                        organizations.map((ele, i) => checkIfInCategories(ele.interests, props.categoriesToShow) && <OrganizationCard key={i} ActionButton={RequestModalButton} ActionButtonOnClick={openModal} {...ele} />)
                    }
                </OrganizationContainer>
                <CreateOrgButton onClick={createModal}>Enter An Organization</CreateOrgButton>
                {
                    modalData &&
                    <Modal close={true} setClose={closeModal}>
                        <CreatingEditingOrg setLoading = {setLoading} closeModal = {closeModalAndRefresh} edit={modalData.create == undefined} _id={modalData != null ? modalData._id : ""} {...modalData} />
                    </Modal>
                }

            </Component>
        );
    } else {
        return <>Loading...</>
    }
}

export default Organizations;