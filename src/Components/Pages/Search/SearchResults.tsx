import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from './SearchResultCards/Page';
import DefaultImage from '../../../img/default.jpg';
import LoadingPage from '../../ComponentLibrayer/LoadingPage';
import Organization from './SearchResultCards/Organzation';
import PickWhatToSearchFor from './PickWhatToSearchForButton';
import Event from './SearchResultCards/Event';

import DefaultImg from '../../../img/climateMarch.jpg'
const axios = require("axios");


const Container = styled.div`
    width: 90% !important;
    width: fit-content;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) { 
        width: 100% !important;
        display: inline-block;
    }
    margin-bottom: 5em;
`;

const Error = styled.h4`
    font-size: 1.5em;
    color: red;
`;

const SearchPickComponent = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
`;

type Props = {
    categoriesToNotAllow: any,
    choice: string
}

function SearchBar(props: Props) {
    const [pages, setPages] = useState([]);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [choice, setChoice] = useState("");
    const searchOption = [
        { text: "Activists", link: "/search?search=Activists" },
        { text: "Organizations", link: "/search?search=Organizations" },
        // { text: "Events", link: "/search?search=Events" }
    ];
    useEffect(() => {
        console.log("this should change")
        setLoading(true);
        if (props.choice != null) {
            fetchAPI();
        } else {
            setLoading(false);
        }
    }, [props.choice]);

    const fetchAPI = async () => {
        setError("")
        let networkError = true;
        try {
            if (!(props.choice == "Organizations" || props.choice == "Events" || props.choice == "Activists")) {
                setLoading(false);
                return;
            }
            const res = await axios.get(`${process.env.REACT_APP_BASEURL}/${props.choice.toLowerCase().substring(0, props.choice.length - 1)}/`);
            networkError = false;
            if (res.data.Error != undefined) {
                setError(res.data.Error)
                return
            }
            setPages(res.data);
            setLoading(false);
            setChoice(props.choice);
        } catch (err) {
            if (networkError) {
                setError("Network error sorry for the inconvenience.")
                return
            }
            setError("Error getting activists. Sorry about that the service will return soon.")
        }
    }

    const checkIfInCategories = (arrayToCheck: any) => {
        let render = false;
        for (let x = 0; x < props.categoriesToNotAllow.length; x++) {
            if (!!arrayToCheck.find((catEle: any) => catEle.ID == props.categoriesToNotAllow[x])) {
                return true
            }
        }
        return (render || props.categoriesToNotAllow.length <= 0)
    }

    const ComponentToRender = () => {
        switch (props.choice) {
            case "Organizations":
                if (props.choice == choice) {
                    return (<>{
                        pages.map((ele, i) => {
                            if (checkIfInCategories(ele.Instrests)) {
                                return <Organization image={(ele.Image.length > 2) ? ele.Image : DefaultImage} name={ele.Name} link={ele.Link} desc={ele.Desc} location={ele.Location} email={ele.Email} interests={ele.Instrests} key={i} />
                            }
                        })
                    }</>)
                } else {
                    return (<div></div>)
                }
                break;
            case "Events":
                return (
                    <>
                        {
                            <Event id={"This is a ID"} categories={[{ Name: "Testing", Colour: 'black', ID: '0' }]} title={"March for the climate"} where={"Parliment Hill"} when={"Now and yesterday"} img={DefaultImg} desc={"This is some filler text. I think it should be about three sentences. ABout the events, actually it ho-udl be able to be more with a see more button so I am still going."} />
                        }
                    </>
                )
                break;
            case "Activists":
                if (props.choice == choice) {
                    return (
                        <>
                            {
                                pages.map((ele, i) => {
                                    if (checkIfInCategories(ele.Categories)) {
                                        return <Page width={"29%"} image={(ele.Image.length > 2) ? ele.Image : DefaultImage} Categories={ele.Categories} ID={ele.PageID} name={ele.Name} para={ele.Para1} key={i} />
                                    }
                                })
                            }
                        </>
                    );

                } else {
                    return (<div></div>)
                }
                break;
            default:
                return (
                    <>
                        <SearchPickComponent>
                            {
                                searchOption.map(ele => <PickWhatToSearchFor text={ele.text} link={ele.link} />)
                            }
                        </SearchPickComponent>
                    </>
                )
                break;
        }
    }
    if (!loading || error.length > 0) {
        return (
            <Container>
                {ComponentToRender()}
            </Container>
        );
    } else {
        return (
            <LoadingPage />
        )
    }
}

export default SearchBar;
