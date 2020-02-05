import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const Component = styled.div`
     width: 5em;
    margin-bottom: 0.5em;
`;

const Option = styled(Link)`
     font-size: 1.1em;
    margin: auto 0;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    cursor: pointer;
    color: black;
    font-weight: bold;
`;

type Props = {
    link: string,
    name: string
}

function DropDownOption(props: Props) {
    return (
        <Component>
            <Option to={props.link}>{props.name}</Option>
        </Component>
    )
}

export default DropDownOption;