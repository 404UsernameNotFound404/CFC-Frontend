import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCategories } from '../search-page-functions/getCategories';

type ComponentProps = {
    justifyContent: string
}

const Component = styled.div<ComponentProps>`
    width: 100%;
    height: fit-content;
    margin: auto;
    padding-bottom: 2em;
    display: flex;
    flex-flow: wrap;
    margin-top: 2em;
    justify-content: ${p => p.justifyContent};
    ${p => p.justifyContent == "space-between" ? `
    &::after {
        content: "";
        flex: 1;
    }` : ''}
`;

export type CategoryButtonStyleProps = {
    colour: string,
    active: boolean
}

export type CategoryButtonProps = {
    Name: string,
    Colour: string,
    Active: boolean,
    ID: number,
    activateButton: Function
}

type Props = {
    changeCategory: any;
    activeCategories?: any;
    CategoryButton: (props: CategoryButtonProps) => JSX.Element;
    justifyContent?: string;
}

function Categories(props: Props) {
    const [activeCategories, setActiveCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const { CategoryButton} = props;
    const justifyContent = props.justifyContent ? props.justifyContent : "space-evenly";

    useEffect(() => {
        if (props.activeCategories) {
            setActiveCategories(props.activeCategories);
        }
    }, [])

    useEffect(() => {
        const getCategoriesUseEffect = async () => {
            let categoriesData = await getCategories();
            updateCategoriesWithActiveCategories(props.activeCategories, categoriesData);
        }
        getCategoriesUseEffect();
    }, []);

    const updateCategoriesWithActiveCategories = (newActiveCategories: number[], categoriesToUse: any) => {
        setCategories(categoriesToUse.map((ele: any) => {
            if (newActiveCategories) {
                if (newActiveCategories.length == 0) return { ...ele, Active: true };
                let found = false;
                for (let x = 0; x < newActiveCategories.length; x++) {
                    if (newActiveCategories[x] == parseInt(ele.ID)) found = true;
                }
                if (!found) return { ...ele, Active: false };
            }
            return { ...ele, Active: true };
        }));
    }

    const updateActiveCategories = (id: string) => {
        let newActiveCategories = [...activeCategories];
        let found = false;
        for (let x = 0; x < newActiveCategories.length; x++) {
            if (newActiveCategories[x] == parseInt(id)) found = true;
        }
        if (found) {
            for (let x = 0; x < newActiveCategories.length; x++) {
                if (newActiveCategories[x] == parseInt(id)) newActiveCategories.splice(x, 1);
            }
        } else newActiveCategories.push(parseInt(id));
        setActiveCategories(newActiveCategories);
        updateCategoriesWithActiveCategories(newActiveCategories, categories);
        props.changeCategory(newActiveCategories);
    }

    if (categories.length != 0) {
        return (
            <Component justifyContent={justifyContent}>
                {categories.map(ele => <CategoryButton activateButton={updateActiveCategories} {...ele} />)}
            </Component>
        );
    } else {
        return <>Loading...</>
    }
}

export default Categories;