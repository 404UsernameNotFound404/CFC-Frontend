import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchActivists from './SearchResults/SearchResults';
import CategorySearch from '../../ComponentLibrayer/CategorySearch/CategorySearch';
const axios = require("axios");

const PageContainer = styled.div`
    padding-top: 2.5em;
    width: 75em;
    margin: auto;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 90%;
    }
`;

const TopPartPage = styled.div`
    padding-top: 15vh;
    padding-bottom: 7.5vh;
    width: 100%;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        padding-top: 3em;
        padding-bottom: 0em;
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
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [allCategories, setAllCategories] = useState([]);
    const [categoryButtons, setCategoryButtons] = useState([]);
    const [categoriesToNotAllow, setCategoriesToNotAllow] = useState([]);
    const [whatYourSearching, setWhatYourSearching] = useState(null);
    const [pickedCategory, setPickedCategory] = useState(false);
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
        try {
            const res = await axios.post(`${process.env.REACT_APP_BASEURL}/getCategories`);
            setAllCategories(res.data);
            setCategoriesToNotAllow([])
            setLoadingCategories(false);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <PageContainer>
            <TopPartPage>
                {!(whatYourSearching == "Organizations" || whatYourSearching == "Activists" || whatYourSearching == "Events") ? 
                    <SearchBoxTitle>What are you looking for?</SearchBoxTitle> :
                    <>
                        <SearchBoxTitle>What category are you looking for?</SearchBoxTitle>
                        {/* <CategorySearch loading={loadingCategories} setCategoriesToNotAllow={setCategoriesToNotAllow} categoriesToNotAllow={categoriesToNotAllow} categoryButtons={categoryButtons} setCategoryButtons={setCategoryButtons} categories={allCategories} /> */}
                    </>
                }
            </TopPartPage>
            <SearchActivists choice={whatYourSearching} categoriesToNotAllow={categoriesToNotAllow} />
        </PageContainer>
    );
}

export default LinksContainer;