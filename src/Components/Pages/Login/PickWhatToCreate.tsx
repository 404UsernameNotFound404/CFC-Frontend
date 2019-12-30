import React from 'react';
import styled from 'styled-components';

const Component = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

type LinkToProps = {
    marginLeft: boolean
}

const LinkTo = styled.div<LinkToProps>`
    margin-left: ${p => p.marginLeft ? 'auto' : '0'};
    margin-right: 0.5em
    font-size: 1em;
    color: grey;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`;

const LinkContainer = styled.div`
    width: 12em;
    display: flex;
    justify-content: center;
`;

type Props = {
    registerUser: any,
    registerOrg: any
}

function PickWhatToCreate(props: Props) {
    return (
        <Component>
            <LinkContainer>
                <LinkTo marginLeft = {true} onClick = {props.registerUser}>Create An Account</LinkTo>
            </LinkContainer>
            -
            <LinkContainer>
                <LinkTo marginLeft = {false} onClick = {props.registerOrg}>Create An Organization</LinkTo>
            </LinkContainer>
        </Component>
    );
}

export default PickWhatToCreate;
