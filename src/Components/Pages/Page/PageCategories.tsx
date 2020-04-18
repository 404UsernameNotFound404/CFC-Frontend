import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryTag from './CategoryTag'

const axios = require("axios");

type ContentProp = {
    margin: string,
    justify_content: string,
    width: string
}

const Content = styled.div<ContentProp>`
    /* min-width: 60em; */
    max-width: 100%;
    width: ${p => p.width};
    height: fit-content;
    margin: 1em ${p => p.margin};
    display: flex;
    flex-wrap: wrap;
    justify-content: ${p => p.justify_content};
`;

type Props = {
    editMode: boolean,
    categories: { Name: string, ID: string, Colour: string }[],
    allCategories: any,
    setAllCategories: any,
    width: string,
    margin?: string,
    justify_content?: string,
    widthOfCot?: string
}

const defaultProps = {
    margin: 'auto',
    justify_content: 'space-between',
    width: ''
}

function PageCategories(props: Props) {
    const [loading, setLoading] = useState(true);
    const { allCategories, setAllCategories, editMode, categories, width } = props;
    const margin = props.margin == undefined ? defaultProps.margin : props.margin;
    const widthOfCot = props.widthOfCot == undefined ? defaultProps.width : props.widthOfCot;
    const justify_content = props.justify_content == undefined ? defaultProps.justify_content : props.justify_content;
    useEffect(() => {
        console.log(props.margin)
        if (setAllCategories != null) fetchCategories();
    }, [])

    useEffect(() => {
        if (editMode && allCategories.length > 0) updateAllCategories(allCategories);
    }, [editMode]);

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
            if (categories != undefined) {
                let dis = !categories.find((catEle: any) => {
                    if (typeof catEle.ID == "number") return catEle.ID + "" === ele.ID
                    else return catEle.ID === ele.ID
                })
                return { ...ele, disabled: dis }
            } else {
                return { ...ele, disabled: true }
            }
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

    return (
        <Content width = {widthOfCot} justify_content={justify_content} margin={margin}>
            {!editMode ?
                categories.map((ele, i: number) => <CategoryTag width={width} id={""} clickFunction={() => { }} clickable={false} disabled={false} name={ele.Name} colour={ele.Colour} key={i} />)
                :
                allCategories.map((ele: any, i: number) => <CategoryTag width={width} id={ele.ID} clickFunction={disable} clickable={true} disabled={ele.disabled} name={ele.Name} colour={ele.Colour} key={i} />)
            }
        </Content>
    );
}

export default PageCategories;