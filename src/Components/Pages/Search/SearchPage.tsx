import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import CategorySearch from './CategorySearch';
import SearchForWhat from './SearchForWhat';
import { BASEURL } from '../../../Constants'
import PageCategories from '../Page/PageCategories'
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

const SearchForWhatPage = styled.div`
    width: 75em;
    height: 100vh;
    margin: auto;
    display: flex;
    justify-content: center;
`;

const SearchForWhatContainer = styled.div`
    margin-top: 4em;
    width: 75%;
    display: flex;
    justify-content: space-between;
`;

const SearchForWhatTitle = styled.h1`
    font-size: 4em;
    position: absolute;
    top: 10vh;
`;

const OR = styled.h1`
    font-size: 3em;
    margin: auto;
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
    const thingsToSearch = ["activists", "events", "organizations"]

    useEffect(() => {
        findWhatToSearchFor();
        fetchCatagories();
    }, []);

    const findWhatToSearchFor = () => {
        let DocLocation = document.location as unknown;
        let params = (new URL(DocLocation as string)).searchParams;
        let search = params.get("search");
        console.log(search)
        console.log(!!thingsToSearch.find(ele => ele == search))
        if (search == null || !thingsToSearch.find(ele => ele == search)) {
            //bring up choice of what to search for
        } else {
            switch (search) {
                case "activists":
                    break;
                case "events":
                    break;
                case "organizations":
                    break;
            }
        }
    }

    const fetchCatagories = async () => {
        const res = await axios.post(`${BASEURL}/getCategories`);
        setAllCategories(res.data.Categories)
    }

    return (
        <PageContainer>
            <TopPartPage>
                <SearchBoxTitle>What are you looking for?</SearchBoxTitle>
                <SearchBoxSubTitle>What category are you looking for?</SearchBoxSubTitle>
                <CategorySearch setCategoriesToNotAllow={setCategoriesToNotAllow} categoriesToNotAllow={categoriesToNotAllow} categoryButtons={categoryButtons} setCategoryButtons={setCategoryButtons} categories={allCategories} />
            </TopPartPage>
            <SearchResults categoriesToNotAllow={categoriesToNotAllow} WhatWasSearched={'asd'} />
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