import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from '../Page';
import DefaultImage from '../../../../img/default.jpg';
import { BASEURL } from '../../../../Constants';
import Cookie from 'js-cookie';
import LoadingPage from '../../../ComponentLibrayer/LoadingPage';
import Organization from '../Organzation';
const axios = require("axios");


const Container = styled.div`
    width: 90% !important;
    width: fit-content;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media (max-width: 768px) { 
        width: 100% !important;
        display: inline-block;
    }
`;

const Error = styled.h4`
    font-size: 1.5em;
    color: red;
`;

type Props = {
    categoriesToNotAllow: any,
    choice: string
}

function SearchBar(props: Props) {
    const [pages, setPages] = useState([]);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true);
    const [choice, setChoice] = useState("");
    useEffect(() => {
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
            const res = await axios.post(`${BASEURL}/get${props.choice}`);
            networkError = false;
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
        props.categoriesToNotAllow.map((notAllowEle: any) => {
            console.log(props.categoriesToNotAllow)
            console.log(arrayToCheck)
            render = !arrayToCheck.find((catEle: any) => {
                return catEle.ID == notAllowEle
            })
        })
        return (render || props.categoriesToNotAllow.length <= 0)
    }

    const ComponentToRender = () => {
        switch (props.choice) {
            case "Organizations":
            if (props.choice == choice) {
                return (<>{
                    pages.map(ele => {
                        if (checkIfInCategories(ele.Instrests)) {
                            return <Organization name={ele.Name} link={ele.Link} desc={ele.Desc} img={DefaultImage} location={ele.Location} interests={ele.Instrests} />
                        }
                    })
                }</>)
            } else {
                return (<div></div>)
            }
                break;
            case "Events":
                return <>Even</>
                break;
            case "Activists":
                if (props.choice == choice) {
                    return (<>
                        {
                            pages.map((ele, i) => {
                                console.log(ele)
                                if (checkIfInCategories(ele.Categories)) {
                                    return <Page ID={ele.PageID} name={ele.Name} img={DefaultImage} para={ele.Para1} key={i} />
                                }
                            })
                        } </>)
                } else {
                    return (<div></div>)
                }
                break;
            default:
                return (<>pick</>)
                break;
        }
    }
    if (!loading || error.length > 0) {
        return (
            <Container>
                <Error>{error}</Error>
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
