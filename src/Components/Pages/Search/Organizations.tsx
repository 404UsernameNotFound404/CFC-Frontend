import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { getSearchData } from '../../packages/search-page-functions/getSearchData';
import { AppContext } from '../../../Context/AppContext';
import OrganizationCard, { ActionButtonProps } from '../../packages/organization-card-react/organizationsCard';
import { checkIfInCategories } from '../../packages/search-page-functions/checkIfHasCategories';
import Modal from '../../packages/modal-react';
import CreatingEditingOrg from '../../packages/organization-card-react/creatingEditingOrgs';

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

    useEffect(() => {
        const getOrgs = async () => {
            const orgsData = await getSearchData("Organizations");
            console.log(orgsData)
            if (orgsData.error != undefined) console.log("error");//TODO
            else setOrganizations(orgsData);
        }
        getOrgs();
    }, []);

    const openModal = (orgId: string) => {
        console.log("open " + orgId);
        let orgToEdit = organizations.find(ele => ele._id == orgId)
        setModalData(orgToEdit);
    }

    const closeModal = () => setModalData(null);

    if (organizations.length != 0) {
        return (
            <Component>
                {
                    organizations.map(ele => checkIfInCategories(ele.interests, props.categoriesToShow) && <OrganizationCard ActionButton={RequestModalButton} ActionButtonOnClick={openModal} {...ele} />)
                }
                {
                    modalData &&
                    <Modal close = {true} setClose={closeModal}>
                        <CreatingEditingOrg edit={!modalData.edit} {...modalData} />
                    </Modal>
                }
                
            </Component>
        );
    } else {
        return <>Loading...</>
    }
}

export default Organizations;