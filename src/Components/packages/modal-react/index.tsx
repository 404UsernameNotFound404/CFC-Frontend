import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';
import testIds from './test/testIds';

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

type ContentProps = {
    width: string
}

const Content = styled.div<ContentProps>`
    width: ${p => p.width};
    background-color: white;
    max-height: 80vh;
    overflow-y: scroll;
    margin: auto;
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
    children: React.ReactNode[] | React.ReactNode,
    width?: string
}

export default function Modal(props: Props) {
    const closeIcon = <FontAwesomeIcon icon={faTimes} />
    const isPhone = useMediaQuery({ minDeviceWidth: parseInt(process.env.REACT_APP_PHONE_BREAK) });
    const {width = (!isPhone ? "95%" : "40em")} = props;

    if (!props.close) {
        return (
            <Component data-testid={testIds.container}>
                <Content width={width}>
                    <CloseIcon data-testid={testIds.closeButton} onClick={() => { console.log("here"); props.setClose(false) }}>{closeIcon}</CloseIcon>
                    {props.children}
                </Content>
            </Component>
        )
    } else {
        return (<></>)
    }
}

