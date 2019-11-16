import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryButton from './CategoryButton';

const Container = styled.div`
    width: 90%;
    height: fit-content;
    margin: auto;
    padding-bottom: 2em;
    display: flex;
    flex-wrap: wrap;
`;

type Props = {
    categories: string[][]
}

type CategoryButtonArray = { text: string, normalColor: string, highLightColor: string, active: boolean, id: number }[];

function CategorySearch(props: Props) {
    const [categoryButtons, setCategoryButtons] = useState([]);
    const [firstTimePick, setFirstTimePick] = useState(true);

    useEffect(() => {
        buildCategoryButtons();
    }, [props.categories])

    const buildCategoryButtons = () => {
        setCategoryButtons(
            props.categories.map((ele, i) => {
                return {
                    text: ele[0],
                    colour: ele[1],
                    active: true,
                    id: ele[2]
                }
            })
        );
    }

    const activateButton = (id: number) => {
        if (firstTimePick) {
            setFirstTimePick(false);
            let newArray: any = categoryButtons.map(ele => {
                if (ele.id === id) {
                    ele.active = true;
                } else {
                    ele.active = false;
                }
                return ele;
            });
            setCategoryButtons(newArray);
            return
        }
        let newArray: any = categoryButtons.map(ele => {
            if (ele.id === id) {
                (ele.active) ? (ele.active = false) : (ele.active = true);
            }
            return ele;
        });
        setCategoryButtons(newArray);
    }

    return (
        <Container>
            {console.log(categoryButtons)}
            {categoryButtons.map((ele, i) => <CategoryButton colour = {ele.colour} activateButton={activateButton} text={ele.text} active={ele.active} id={ele.id} key = {i} />)}
        </Container>
    );
}

export default CategorySearch;
