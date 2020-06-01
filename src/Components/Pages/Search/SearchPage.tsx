import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Categories, {CategoryButtonProps, CategoryButtonStyleProps} from '../../packages/categories-react/Categories';
import Activists from './Activists';
import Organizations from './Organizations'

const PageContainer = styled.div`
    padding-top: 7em;
    width: 75em;
    margin: auto;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 90%;
    }
`;

const SearchBoxTitle = styled.h1`
    font-size: 4em;
    margin: 0;
    text-align: center;
`;

const CategoriesContainer = styled.div`
    width: 90%;
    margin: auto;
`;

const CategoryButtonStyle = styled.div<CategoryButtonStyleProps>`
    cursor: pointer;
    background-color: ${p => p.colour};
    border-radius: 0.5em;
    width: 21%;
    padding: 1.5em 1%;
    margin: 1em auto;
    text-align: center;
    color: black !important;
    min-height: 3em;
    opacity: ${p => p.active ? '1' : '0.5'};
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        padding: 1em 1%;
        width: 8em;
    }
    display: flex;
    justify-content: center;
    &:hover {
        border-color: transparent;
        color: white;
    }
`;

const CategoryButtonText = styled.h1`
    font-size: 1.5em;
    text-align: center;
    margin: auto;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        font-size: 1.25em;
    }
`;

const CategoryButton = (props: CategoryButtonProps) => {
    const { Name, Active, Colour, ID, activateButton } = props;
    return (
        <CategoryButtonStyle active={Active} colour={Colour} onClick={() => { activateButton(ID) }}><CategoryButtonText>{Name}</CategoryButtonText></CategoryButtonStyle>
    );
}

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
        switch (whatYourSearching) {
            case "Activists":
                return <Activists categoriesToShow={activeCategories} />
                break;
            case "Organizations":
                return <Organizations categoriesToShow={activeCategories} />
                break;
            case "Events":
                return <>Coming Soon...</>
                break;
        }
    }

    const updateActiveCategories = (newActiveCategories: number[]) => { setActiveCategories(newActiveCategories) }

    return (
        <PageContainer>
            <SearchBoxTitle>What are you looking for?</SearchBoxTitle> 
            <CategoriesContainer>
                <Categories justifyContent = {"space-around"} CategoryButton={CategoryButton} activeCategories={activeCategories} changeCategory={updateActiveCategories} />
            </CategoriesContainer>
            {dataToRender()}
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