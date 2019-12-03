import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchActivists from './SearchResults/SearchActvists';
import CategorySearch from './CategorySearch';
import { BASEURL } from '../../../Constants';
import SearchEvents from './SearchResults/SearchEvents';
import SearchOrganizations from './SearchResults/SearchOrganizations';
const axios = require("axios");

const PageContainer = styled.div`
    padding-top: 2.5em;
    width: 75em;
    margin: auto;
    @media (max-width: 768px) { 
        width: 90%;
    }
`;

const TopPartPage = styled.div`
    padding-top: 15vh;
    padding-bottom: 7.5vh;
    width: 100%;
    @media (max-width: 768px) { 
        padding-top: 3em;
    }
`;

const SearchBoxTitle = styled.h1`
    font-size: 4em;
    margin: 0;
    text-align: center;
`;

const SearchBoxSubTitle = styled.h4`
    font-size: 2em;
    margin: 0;
    text-align: center;
`;


function LinksContainer() {
    const [allCategories, setAllCategories] = useState([]);
    const [categoryButtons, setCategoryButtons] = useState([]);
    const [categoriesToNotAllow, setCategoriesToNotAllow] = useState([]);
    const [whatYourSearching, setWhatYourSearching] = useState(null);
    const thingsToSearch = ["Activists", "Events", "Organizations", null]


    useEffect(() => {
        fetchCatagories();
    }, []);

    useEffect(() => {
        if (checkIfSearchParamsChanges() != whatYourSearching) {
            findWhatToSearchFor();
        }
    });

    const findWhatToSearchFor = () => {
        console.log("find what to search")
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

    const fetchCatagories = async () => {
        const res = await axios.post(`${BASEURL}/getCategories`);
        setAllCategories(res.data)
    }

    return (
        <PageContainer>
            <TopPartPage>
                <SearchBoxTitle>What are you looking for?</SearchBoxTitle>
                <SearchBoxSubTitle>What category are you looking for?</SearchBoxSubTitle>
                <CategorySearch setCategoriesToNotAllow={setCategoriesToNotAllow} categoriesToNotAllow={categoriesToNotAllow} categoryButtons={categoryButtons} setCategoryButtons={setCategoryButtons} categories={allCategories} />
            </TopPartPage>
            <SearchActivists choice={whatYourSearching} categoriesToNotAllow={categoriesToNotAllow} />
        </PageContainer>
    );
}

export default LinksContainer;


//   <SearchForWhatPage>
//                 <SearchForWhatTitle>What would you like to search for?</SearchForWhatTitle>
//                 <SearchForWhatContainer>
//                     <SearchForWhat Title = "Events" />
//                     <OR>or</OR>
//                     <SearchForWhat Title = "People" />
//                 </SearchForWhatContainer>
//             </SearchForWhatPage>