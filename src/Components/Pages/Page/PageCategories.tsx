import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BASEURL } from '../../../Constants'
import CategoryTag from './CategoryTag'

const axios = require("axios");

const Content = styled.div`
    width: 100%;
    height: fit-content;
    margin: 1em auto;
    display: flex;
`;

type Props = {
    editMode: boolean,
    categories: string[][],
    allCategories: any,
    setAllCategories: any
}

function PageCategories(props: Props) {
    const {allCategories, setAllCategories} = props;

    const disable = (id: string) => {
        setAllCategories(allCategories.map((ele: any) => {
            if (ele.data[2] == id) {
                return {...ele, disabled: !ele.disabled}
            } else {
                return ele
            }
        }))
    }



    if (!props.editMode) {
        return (
            <Content>
                {props.categories.map(ele => <CategoryTag id = {""} clickFunction={() => { }} clickable={false} disabled={false} name={ele[0]} colour={ele[1]} />)}
            </Content>
        );
    } else {
        return (
            <Content>
                {console.log("here")}
                {allCategories.map((ele: any) => <CategoryTag id = {ele.data[2]} clickFunction={disable} clickable={true} disabled={ele.disabled} name={ele.data[0]} colour={ele.data[1]} />)}
            </Content>
        );
    }
}

export default PageCategories;