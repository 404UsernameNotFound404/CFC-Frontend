import React from 'react';
import styled from 'styled-components';

const Component = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 1em 0;
`;

const LinkToCreatingSomething = styled.span`
    color: #3d3dff;
    cursor: pointer;
    font-weight: lighter;
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
            <LinkToCreatingSomething onClick = {() => {props.registerUser(); }}>Create an account</LinkToCreatingSomething>
        </Component>
    );
}

export default PickWhatToCreate;
