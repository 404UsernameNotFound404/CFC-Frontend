import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CategoryButton from './CategoryButton';
import LoadingAnimation from '../../../img/LoadingImageLine.gif'
import LoadingPage from '../../ComponentLibrayer/LoadingPage';

const Container = styled.div`
    width: 90%;
    height: fit-content;
    margin: auto;
    padding-bottom: 2em;
    display: flex;
    flex-wrap: wrap;
    margin-top: 2em;
`;

const LoadingGif = styled.img`
    margin: auto;
    display: block;
    height: 10em;
`;

type Props = {
    categories: string[][],
    categoryButtons: any,
    setCategoryButtons: any,
    categoriesToNotAllow: any,
    setCategoriesToNotAllow: any,
    loading: boolean
}

function CategorySearch(props: Props) {
    const [firstTimePick, setFirstTimePick] = useState(true);
    const {categoriesToNotAllow, setCategoriesToNotAllow, categoryButtons, setCategoryButtons, loading} = props;

    useEffect(() => {
        buildCategoryButtons();
    }, [props.categories])

    const buildCategoryButtons = () => {
        console.log(props.categories)
        setCategoryButtons(
            props.categories.map((ele: any, i) => {
                return {
                    text: ele.Name,
                    colour: ele.Colour,
                    active: true,
                    id: ele.ID
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
        if(!newArray.find((ele: any) => ele.active)) {
            setFirstTimePick(true)
            newArray = newArray.map((ele: any) => {
                return {...ele, active: true}
            })
        }
        setCategoryButtons(newArray);
    }

    return (
        <Container>
            {!loading ? 
            categoryButtons.map((ele: any, i: any) => {
                return <CategoryButton colour = {ele.colour} activateButton={activateButton} text={ele.text} active={ele.active} id={ele.id} key = {i} />
            })
            :
            <LoadingPage />
            }
        </Container>
    );
}

export default CategorySearch;
