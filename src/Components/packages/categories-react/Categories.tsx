import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCategories } from '../search-page-functions/getCategories';

const Component = styled.div`
    padding-top: 2.5em;
    width: 75em;
    margin: auto;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 90%;
    }
`;

type Props = {
    changeCategory: any;
    activeCategories?: any;
}

function Categories(props: Props) {
    const [activeCategories, setActiveCategories] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        if (props.activeCategories) {
            setActiveCategories(props.activeCategories);
        }
    }, [])

    useEffect(() => {
        const getCategoriesUseEffect = async () => {
            const categoriesData = await getCategories();
            console.log(categoriesData);
            setCategories(categoriesData);
        }
        getCategoriesUseEffect();
    }, []);

    if (categories.length != 0) {
    return (
        <Component>
        </Component>
    );
    } else {
        return <>Loading...</>
    }
}

export default Categories;


{/* <PageContainer>
            <TopPartPage>
                {
                    !(whatYourSearching == "Organizations" || whatYourSearching == "Activists" || whatYourSearching == "Events") ?
                        <SearchBoxTitle>What are you looking for?</SearchBoxTitle> 
                        :
                        <>
                            <SearchBoxTitle>What category are you looking for?</SearchBoxTitle>
                            <CategorySearch setCategoriesToNotAllow={setCategoriesToNotAllow} categoriesToNotAllow={categoriesToNotAllow} categoryButtons={categoryButtons} setCategoryButtons={setCategoryButtons} />
                        </>
                }
            </TopPartPage>
            <Para>We do not yet have contacts with all the organizations on our list. We have compiled this list to help activists find organizations. If you do not see an organization on our list, please add it. </Para>
            <SearchActivists choice={whatYourSearching} categoriesToNotAllow={categoriesToNotAllow} />
        </PageContainer> */}