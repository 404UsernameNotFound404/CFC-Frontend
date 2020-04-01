import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CFCLogo from './CFCLogo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

const ComponentPos = styled.div`
    position: fixed;
    bottom: 1em;
    right: 1em;
    width: 20em;
    height: 12em;
    z-index: -10;
    overflow: hidden;
    border-radius: 0.25em;
    color: #000;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        left: 5%;
        width: 90%;
    }
`;

const Component = styled.div`
    width: 100%;
    height: 130%;
    position:relative;
    /* overflow:hidden; */
    &:before {
        content:'';
        position:absolute;
        left: 30%;
        bottom:75%;
        width:40%;
        height:50%;
        border-radius:50%;
        box-shadow: 0px 100px 0px 400px #7eafdc;
    }
`;

const LogoDiv = styled.div`
    position: absolute;
    top: -3.5em;
    display: flex;
    width: 100%;
    margin: auto;
    justify-content: center;
    z-index: -1000em;
    pointer-events: none;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        right: 3.25%;
    }
`;

type BigComponentProps = {
    show: boolean
}

const BigComponent = styled.div<BigComponentProps>`
    position: fixed;
    bottom: 1em;
    right: 1em;
    width: 20em;
    height: 12em;
    z-index: 9000000000;
    opacity: ${p => p.show ? '1' : '0'};
    transition: opacity 1s;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    z-index: 900;
`;

const Xoff = styled.h1`
    font-size: 1.8em;
    width: fit-content;
    margin: 0;
    margin-left: auto;
    margin-right: 0.4em;
    margin-top: 0.35em;
    color: #ff2727;
    cursor: pointer;
    &:hover {
        color: white;
    }
    transition: 0.2s color;
`;


type MessageToUserProps = {
    colour: string
}

const MessageToUser = styled.h4<MessageToUserProps>`
    color: ${p => p.colour};
    width: 90%;
    margin: auto;
    margin-top: 3.5em;
    height: fit-content;
    max-height: 80%;
    font-size: 1.4em;
    text-align: center;
`;

type Props = {
    message: string,
    colour: string
}

function MessageToUserComponent(props: Props) {
    const [show, setShow] = useState(false);
    const [fadeTimer, setFadeTimer] = useState(null);
    const closeIcon = <FontAwesomeIcon icon={faWindowClose} />
    const { message, colour } = props;
    useEffect(() => {
        if (message.length > 0) {
            setShow(true);
            setFadeTimer(setTimeout(() => {
                setShow(false);
                setFadeTimer(null);
            }, 2000))
        }
    }, [message])
    return (
        <BigComponent show = {show}>
            <ComponentPos>
                <Component>
                </Component>
            </ComponentPos>
            <LogoDiv>
                <CFCLogo />
            </LogoDiv>
            <Content>
                {/* <Xoff onMouseOver={() => { console.log("over") }} onClick={() => { console.log("testing") }}>{closeIcon}</Xoff> */}
                <MessageToUser colour={colour}>{message}</MessageToUser>
            </Content>
        </BigComponent>
    );
}

export default MessageToUserComponent;