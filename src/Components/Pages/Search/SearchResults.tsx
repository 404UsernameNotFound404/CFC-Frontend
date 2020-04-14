import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import Page from './SearchResultCards/Page';
import DefaultImage from '../../../img/default.jpg';
import LoadingPage from '../../ComponentLibrayer/LoadingPage';
import Organization from './SearchResultCards/Organzation';
import PickWhatToSearchFor from './PickWhatToSearchForButton';
import Event from './SearchResultCards/Event';

import DefaultImg from '../../../img/climateMarch.jpg'
import { AppContext } from '../../../Context/AppContext';
import { Link } from 'react-router-dom';
import ContactModal from '../Page/ContactModal';
import CreatingOrg from './creatingOrg';

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

const NeedToLogin = styled.h3`
    font-size: 1.8em;
`;

const NeedToLoginLink = styled(Link)`
    /* font-size: 1.8em; */
    margin-left: 0.2em;
`;

const CreateOrgButton = styled.div`
    width: fit-content;
    border-radius: 0.5em;
    padding: 0.5em 1em;
    background-color: #3c78d8;
    margin-bottom: 3em;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #183e7c;
    }
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
    const [creatingOrg, setCreatingOrg] = useState(false);
    const searchOption = [
        { text: "Activists", link: "/search?search=Activists" },
        { text: "Organizations", link: "/search?search=Organizations" },
        // { text: "Events", link: "/search?search=Events" }
    ];
    const c = useContext(AppContext);

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
        if (c.userToken.length <= 4 && props.choice == "Activists") {
            setChoice(props.choice);
            setLoading(false);
            return
        }
        try {
            if (!(props.choice == "Organizations" || props.choice == "Events" || props.choice == "Activists")) {
                setLoading(false);
                return;
            }
            let resRaw;
            let res;
            console.log(props.choice)
            console.log(process.env.REACT_APP_BASEURLNODE)
            console.log(process.env.REACT_APP_BASEURL)
            if (props.choice == "Organizations") {
                resRaw = await fetch(`${process.env.REACT_APP_BASEURLNODE}/${props.choice.toLowerCase().substring(0, props.choice.length - 1)}/`, {
                    method: "GET",
                    headers: {
                        "Authorization": (c.userToken && c.userToken.length >= 4 ? c.userToken : '123')
                    }
                });
            } else {
                resRaw = await fetch(`${process.env.REACT_APP_BASEURL}/${props.choice.toLowerCase().substring(0, props.choice.length - 1)}/`, {
                    method: "GET",
                    headers: {
                        "Authorization": (c.userToken && c.userToken.length >= 4 ? c.userToken : '123')
                    }
                });
            }
            res = await resRaw.json();
            console.log(res)
            networkError = false;
            if (res.Error != undefined) {
                setError(res.Error)
                return
            }
            setPages(res);
            setLoading(false);
            setChoice(props.choice);
        } catch (err) {
            console.log(err);
            if (networkError) {
                c.setMessageToUser({ message: "Network error sorry for the inconvenience.", colour: "red" })
                return
            }
            c.setMessageToUser({ message: "Error getting activists. Sorry about that the service will return soon.", colour: "red" })
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
                    return (
                        pages.map((ele, i) => {
                            if (checkIfInCategories(ele.Instrests)) return <Organization id = {ele._id} image={DefaultImage} name={ele.data.name} link={ele.data.link} desc={ele.data.desc} location={ele.data.location} email={ele.data.email} interests={ele.data.interests} key={i} />;
                        })
                    );
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
                    //if not logged in can not view activists
                    return (
                        (c.userToken.length >= 4 ?
                            <>
                                {
                                    pages.map((ele, i) => {
                                        if (checkIfInCategories(ele.Categories)) {
                                            return <Page width={"29%"} image={(ele.Image.length > 2) ? ele.Image : DefaultImage} Categories={ele.Categories} ID={ele.PageID} name={ele.Name} para={ele.Para1} key={i} />
                                        }
                                    })
                                }
                            </> :
                            <>
                                <NeedToLogin>
                                    Sorry you need to be logged in to view activists.
                                    This is to help keep activists safe.
                                    Please login or create an account here:
                                    <NeedToLoginLink to="/login">Login</NeedToLoginLink>
                                </NeedToLogin>
                            </>
                        )
                    )
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
            <>
                <Container>
                    {ComponentToRender()}
                </Container>
                {(props.choice == "Organizations") ? <CreateOrgButton onClick={() => { setCreatingOrg(true) }}>Create a new Organization</CreateOrgButton> : ""}
                <ContactModal close={creatingOrg} setClose={setCreatingOrg}>
                    <CreatingOrg edit = {false} setClose={setCreatingOrg} />
                </ContactModal>
            </>
        );
    } else {
        return (
            <LoadingPage />
        )
    }
}

export default SearchBar;
