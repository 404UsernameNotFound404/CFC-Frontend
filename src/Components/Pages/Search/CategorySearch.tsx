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
    categories: string[][],
    categoryButtons: any,
    setCategoryButtons: any,
    categoriesToNotAllow: any,
    setCategoriesToNotAllow: any
}

function CategorySearch(props: Props) {
    const {categoryButtons, setCategoryButtons} = props;
    const [firstTimePick, setFirstTimePick] = useState(true);
    const {categoriesToNotAllow, setCategoriesToNotAllow} = props;

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
            let newArray: any = categoryButtons.map((ele: any) => {
                if (ele.id === id) {
                    let tempArray = categoriesToNotAllow;
                    tempArray.push(id);
                    setCategoriesToNotAllow(tempArray)
                    ele.active = true;
                } else {
                    ele.active = false;
                   
                }
                return ele;
            });
            setCategoryButtons(newArray);
            return
        }
        let newArray: any = categoryButtons.map((ele: any) => {
            if (ele.id === id) {
                if (ele.active) {
                    let temp = [];
                    for(let x = 0;x < categoriesToNotAllow.length; x++) {
                        if(categoriesToNotAllow[x] != id) {
                            temp.push(categoriesToNotAllow[x])
                        }
                    }
                    setCategoriesToNotAllow(temp);
                    ele.active = false;
                } else {
                    let tempArray = categoriesToNotAllow;
                    tempArray.push(id);
                    setCategoriesToNotAllow(tempArray)
                    ele.active = true;
                }
            }
            return ele;
        });
        setCategoryButtons(newArray);
    }

    return (
        <Container>
            {categoryButtons.map((ele: any, i: any) => {
                return <CategoryButton colour = {ele.colour} activateButton={activateButton} text={ele.text} active={ele.active} id={ele.id} key = {i} />
            })}
        </Container>
    );
}

export default CategorySearch;
