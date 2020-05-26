import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Categories from '../../packages/categories-react/Categories';
import Activists from './Activists';
import Organizations from './Organizations'

const PageContainer = styled.div`
    padding-top: 2.5em;
    width: 75em;
    margin: auto;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 90%;
    }
`;

const CategoriesContainer = styled.div`
    margin: auto;
`;

function LinksContainer() {
    const [activeCategories, setActiveCategories] = useState([]);
    const [whatYourSearching, setWhatYourSearching] = useState(null);
    const thingsToSearch = ["Activists", "Events", "Organizations", null]

    useEffect(() => {
        if (checkIfSearchParamsChanges() != whatYourSearching) {
            findWhatToSearchFor();
        }
    });

    const findWhatToSearchFor = () => {
        let search = checkIfSearchParamsChanges()
        setWhatYourSearching(null)
        thingsToSearch.map((ele, i) => {
            if (ele == search) {
                setWhatYourSearching(ele)
            }
        })
    }

    const checkIfSearchParamsChanges = () => {
        let DocLocation = document.location as unknown;
        let params = (new URL(DocLocation as string)).searchParams;
        return params.get("search");
    }

    const dataToRender = () => {
        switch(whatYourSearching) {
            case "Activists":
                return <Activists categoriesToShow = {[]} />
            break;
            case "Organizations":
                return <Organizations categoriesToShow = {[]} />
            break;
            case "Events": 
                return <>Coming Soon...</>
            break;
        }
    }

    const updateActiveCategories = (newActiveCategories: number[]) => {setActiveCategories(newActiveCategories)}

    return (
        <PageContainer>
            <CategoriesContainer>
                <Categories changeCategory = {updateActiveCategories} />
            </CategoriesContainer>
            {
                dataToRender()
            }
        </PageContainer>
    );
}

export default LinksContainer;


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