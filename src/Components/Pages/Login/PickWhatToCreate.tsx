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
    margin-left: ${p => p.marginLeft ? 'auto' : '0.5em'};
    margin-right: ${p => !p.marginLeft ? 'auto' : '0.5em'};
    font-size: 1em;
    color: grey;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`;

const LinkContainer = styled.div`
    width: 15em;
    display: flex;
    justify-content: center;
`;

const Text = styled.p`
    font-size: 1em;
    text-align: center;
`;

const LinkToCreatingSomething = styled.span`
    color: #3d3dff;
    cursor: pointer;
    :hover {
        text-decoration: underline;
    }
`;

type Props = {
    registerUser: Function,
    registerOrg: Function
}

function PickWhatToCreate(props: Props) {

    return (
        <Component>
            <Text>Create an <LinkToCreatingSomething onClick = {() => {props.registerUser(); }}>user</LinkToCreatingSomething>/<LinkToCreatingSomething onClick = {() => {props.registerOrg(); }}>organization</LinkToCreatingSomething> account</Text>
        </Component>
    );
}

export default PickWhatToCreate;
