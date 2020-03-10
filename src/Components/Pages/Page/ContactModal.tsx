import React, { ReactNode, useContext } from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../../../Context/AppContext';

const Component = styled.div`
    left: 0;
    top: 0;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(100,100,100,0.5);
    z-index: 100000;
    display: flex;
    justify-content: center;
`;

const Content = styled.div`
    width: 40em;
    background-color: white;
    height: fit-content;
    margin: auto;
    border-radius: 0.5em;
    border: 0.15em solid rgb(125,125,125);
    position: relative;
`;

const CloseIcon = styled.h4`
    font-size: 1.5em;
    position: absolute;
    right: 0.5em;
    top: 0.5em;
    margin: 0;
    color: grey;
    cursor: pointer;
    &:hover {
        color: black;
    }
`;

type Props = {
    close: boolean,
    setClose: React.Dispatch<React.SetStateAction<boolean>>,
    children: ReactNode[] | ReactNode
}

function ContactModal(props: Props) {
    const closeIcon = <FontAwesomeIcon icon={faTimes} />
    if (props.close) {
    return (
        <Component>
            <Content>
                <CloseIcon onClick = {() => {console.log("here"); props.setClose(false)}}>{closeIcon}</CloseIcon>
                {props.children}
            </Content>
        </Component>
    )
    } else {
        return (<></>)
    }
}

export default ContactModal;