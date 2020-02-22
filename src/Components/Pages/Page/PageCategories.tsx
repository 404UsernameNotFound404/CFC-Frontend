import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryTag from './CategoryTag'

const axios = require("axios");

type ContentProp = {
    margin: string
}

const Content = styled.div<ContentProp>`
    /* min-width: 60em; */
    max-width: 100%;
    height: fit-content;
    margin: 1em ${p => p.margin};
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

type Props = {
    editMode: boolean,
    categories: { Name: string, ID: string, Colour: string }[],
    allCategories: any,
    setAllCategories: any,
    width: string,
    margin?: string
}

const defaultProps = {
    margin: 'auto'
}

function PageCategories(props: Props) {
    const [loading, setLoading] = useState(true);
    const { allCategories, setAllCategories, editMode, categories, width } = props;
    const margin = props.margin == undefined ? defaultProps.margin : props.margin;
    useEffect(() => {
        console.log(props.margin)
        if (setAllCategories != null) fetchCategories();
    }, [])

    useEffect(() => {
        if (editMode && allCategories.length > 0) updateAllCategories(allCategories);
    }, [editMode, categories]);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BASEURL}/getCategories`, { method: "GET" });
            let data = await res.json();
            data = data.map((ele: any) => { return { ...ele, disabled: true } })
            setAllCategories(data);
            setLoading(false);
            updateAllCategories(data);
        } catch (err) { 
            console.log(err);
        }
    }

    //takes array because when allCategories is state and when function is called state will not be updated
    const updateAllCategories = async (upToDateAllCats: any) => {
        setAllCategories(upToDateAllCats.map((ele: any) => {
            let dis = !categories.find((catEle: any) => {
                return catEle.ID === ele.ID
            })
            return { ...ele, disabled: dis }
        }));
    }

    const disable = (id: string) => {
        setAllCategories(allCategories.map((ele: any) => {
            if (ele.ID == id) {
                return { ...ele, disabled: !ele.disabled }
            } else {
                return ele
            }
        }))
    }



    if (!editMode) {
        return (
            <Content margin = {margin}>
                {categories.map((ele, i: number) => <CategoryTag width={width} id={""} clickFunction={() => { }} clickable={false} disabled={false} name={ele.Name} colour={ele.Colour} key={i} />)}
            </Content>
        );
    } else {
        return (
            <Content margin = {margin}>
                {allCategories.map((ele: any, i: number) => <CategoryTag width={width} id={ele.ID} clickFunction={disable} clickable={true} disabled={ele.disabled} name={ele.Name} colour={ele.Colour} key={i} />)}
            </Content>
        );
    }
}

export default PageCategories;