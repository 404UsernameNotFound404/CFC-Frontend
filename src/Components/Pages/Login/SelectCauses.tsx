import React, { useState } from 'react';
import styled from 'styled-components';
import Cause from './Cause';

const Content = styled.div`
    width: 100%;
    position: relative;
`;

const TitleBar = styled.div`
    height: 2em;
    border: black 0.2em solid;
`;

const TitleBarText = styled.h1`
    margin: auto;
    font-size: 1em;
    text-align: center;
`;

const DropDownContainer = styled.select`
    position: absolute;
    top: 2.6em;
    width: 100%;
    outline: solid grey thin;
`;

const DropDownSelection = styled.option`
    background-color: white;
`;

type Props = {
    dropDownItems: string[];
}

function SelectCauses(props: Props) {
    return (
        <Content>
            {
                props.dropDownItems.map((ele, i) => 
                    <Cause title = {"Envorment"} active = {false} backgroundColor = {"black"} backgroundColorAct = {"green"} />
                )
            }
        </Content>
    );
}

export default SelectCauses;
