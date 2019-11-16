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
    const [editMode, setEditMode] = useState(false);

    const editCategories = async () => {
        const res = await axios.post(`${BASEURL}/getCategories`);
        let cat = res.data.Categories;
        let catWithDisabled = cat.map((ele: string[]) => {
            let dis = !props.categories.find(catEle => {
                return catEle[2] === ele[2]
            })
            return {data: ele, disabled: dis}
        })
        console.log(catWithDisabled)
        setAllCategories(catWithDisabled);
        setEditMode(true);
    }

    const disable = (id: string) => {
        setAllCategories(allCategories.map((ele: any) => {
            if (ele.data[2] == id) {
                return {...ele, disabled: !ele.disabled}
            } else {
                return ele
            }
        }))
    }



    if (!editMode || !props.editMode) {
        return (
            <Content>
                {props.categories.map(ele => <CategoryTag id = {""} clickFunction={() => { }} clickable={false} disabled={false} name={ele[0]} colour={ele[1]} />)}
                {props.editMode ?
                    <CategoryTag id = {"a"} clickFunction={editCategories} clickable={true} disabled={false} name={"Edit Categories"} colour={"#56f25c"} />
                    : ''}
            </Content>
        );
    } else {
        return (
            <Content>
                {allCategories.map((ele: any) => <CategoryTag id = {ele.data[2]} clickFunction={disable} clickable={true} disabled={ele.disabled} name={ele.data[0]} colour={ele.data[1]} />)}
            </Content>
        );
    }
}

export default PageCategories;