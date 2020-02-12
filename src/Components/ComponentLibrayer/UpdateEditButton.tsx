import React from 'react';
import styled from 'styled-components';

type ComponentProps = {
    update: boolean
}

const Component = styled.div<ComponentProps>`
    width: 8em;
    margin-left: auto;
    padding: 0.1em 0;
    border: 0.2em black solid;
    border-color: ${p => p.update ? "green" : "#a4c2f4"};
    color: ${p => p.update ? "green" : "#a4c2f4"};
    border-radius: 0.5em;
    transition: all 0.4s;
    cursor: pointer;
    &:hover {
        background-color: ${p => p.update ? "green" : "#a4c2f4"};
        color: white;
    }
`;

const Text = styled.h1`
    font-size: 1.5em;
    text-align: center;
    margin: 0;
`;

const Container = styled.div`
    width: 65em;
    margin: auto;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        width: 90%;
    }
`;

const FullWidth = styled.div`
    z-index: 100;
    width: 100vw;
    top: 5em;
    left: 0;
    position: fixed;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {  
        top: 2em;
        -webkit-backface-visibility: hidden;
    }
   
`;

type Props = {
    update: boolean,
    switchFCN: any,
    canEdit: boolean
}

function UpdateEditButton(props: Props) {
    const { update, switchFCN, canEdit } = props;
    if (canEdit) {
        return (
            <FullWidth>
                <Container>
                    <Component update={update} onClick={switchFCN}>
                        <Text>{update ? "Update" : "Edit"}</Text>
                    </Component>
                </Container>
            </FullWidth>
        )
    } else {
        return (
            <></>
        )
    }
}

export default UpdateEditButton;