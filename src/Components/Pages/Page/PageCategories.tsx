import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryTag from './CategoryTag'

const axios = require("axios");

const Content = styled.div`
    width: 100%;
    height: fit-content;
    margin: 1em auto;
    display: flex;
    flex-wrap: wrap;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {   
        justify-content: center;
    }
`;

type Props = {
    editMode: boolean,
    categories: { Name: string, ID: string, Colour: string }[],
    allCategories: any,
    setAllCategories: any,
    width: string
}

function PageCategories(props: Props) {
    const [loading, setLoading] = useState(true);
    const { allCategories, setAllCategories, editMode, categories, width } = props;

    useEffect(() => {
        fetchCategories();
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
            <Content>
                {categories.map((ele, i: number) => <CategoryTag width={width} id={""} clickFunction={() => { }} clickable={false} disabled={false} name={ele.Name} colour={ele.Colour} key={i} />)}
            </Content>
        );
    } else {
        return (
            <Content>
                {console.log("doing all cats")}
                {allCategories.map((ele: any, i: number) => <CategoryTag width={width} id={ele.ID} clickFunction={disable} clickable={true} disabled={ele.disabled} name={ele.Name} colour={ele.Colour} key={i} />)}
            </Content>
        );
    }
}

export default PageCategories;