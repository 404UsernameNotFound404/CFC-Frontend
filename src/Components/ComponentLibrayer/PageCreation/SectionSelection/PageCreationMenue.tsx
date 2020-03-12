import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import PageCreationMenuOptions from './PageCreationMenuOptions';

const Component = styled.div`
    margin-top: 1rem;
    display: flex;
`;

const AddModule = styled.div`
    width: 2.25rem;
    height: 2.25rem;
    /* background-color: #46f646; */
    border: thin solid #46f646;
    font-size: 2em;
    text-align: center;
    font-size: 1.5em;
    color: #46f646;
    border-radius: 50%;
    line-height: 2.25rem;
    cursor: pointer;
    margin: auto 0;
    margin-right: 0.2rem;
    &:hover {
        color: #0bd50b;
    }
`;

type Props = {
    createSection: any
}

function PageCreationMenu(props: Props) {
    const [showOptions, setShowOptions] = useState(false);
    const plusIcon = <FontAwesomeIcon icon = {faPlus}/>
    const minusIcon = <FontAwesomeIcon icon = {faMinus} />

    return (
        <Component>
            <AddModule onClick = {() => {setShowOptions(!showOptions)}}>{!showOptions ? plusIcon : minusIcon}</AddModule>
            <PageCreationMenuOptions createSection = {props.createSection} open = {showOptions} />
        </Component>
    );
}

export default PageCreationMenu;