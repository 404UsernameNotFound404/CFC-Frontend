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
    flex-wrap: wrap;
`;

type Props = {
    editMode: boolean,
    categories: {Name: string, ID: string, Colour: string}[],
    allCategories: any,
    setAllCategories: any,
    width: string
}

function PageCategories(props: Props) {
    const {allCategories, setAllCategories} = props;

    const disable = (id: string) => {
        setAllCategories(allCategories.map((ele: any) => {
            if (ele.ID == id) {
                return {...ele, disabled: !ele.disabled}
            } else {
                return ele
            }
        }))
    }



    if (!props.editMode) {
        return (
            <Content>
                {props.categories.map(ele => <CategoryTag width = {props.width} id = {""} clickFunction={() => { }} clickable={false} disabled={false} name={ele.Name} colour={ele.Colour} />)}
            </Content>
        );
    } else {
        return (
            <Content>
                {allCategories.map((ele: any) => <CategoryTag width = {props.width} id = {ele.ID} clickFunction={disable} clickable={true} disabled={ele.disabled} name={ele.Name} colour={ele.Colour} />)}
            </Content>
        );
    }
}

export default PageCategories;