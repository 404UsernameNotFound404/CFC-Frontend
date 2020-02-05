import React from 'react';
import styled from 'styled-components';

const Component = styled.div`
    width: fit-content;
    display: flex;
    margin: auto;
`;

const Input = styled.input`
    margin: auto 0;
`;

const Text = styled.p`
    font-size: 1em;
    margin: auto 0;
    margin-left: 0.5em;
`;

type Props = {
    checked: boolean,
    setChecked: any,
    text: { __html: string; }
}

function CheckBox(props: Props) {
    const {checked, setChecked, text} = props;
    return (
        <Component>
            <Input checked = {checked} onChange = {() => {setChecked(!checked)}} type = "checkbox" />
            <Text dangerouslySetInnerHTML = {text} />
        </Component>
    )
}

export default CheckBox;