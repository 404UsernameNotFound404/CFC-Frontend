import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from './Page';
import DefaultImage from '../../../img/default.jpg';
import { BASEURL } from '../../../Constants';
import Cookie from 'js-cookie';
import LoadingPage from '../../ComponentLibrayer/LoadingPage';
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
    text: string,
    categoriesToNotAllow: any
}

function SearchBar(props: Props) {
    const [pages, setPages] = useState([]);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchAPI();
    }, []);

    const fetchAPI = async () => {
        let networkError = true;
        try {
            const res = await axios.post(`${BASEURL}/getPages`);
            console.log(res)
            networkError = false;
            setPages(res.data)
            setLoading(false);
        } catch (err) {
            console.log(err)
            if (networkError) {
                setError("Network error sorry for the inconvenience.")
                return
            }
            setError("Error getting activists. Sorry about that the service will return soon.")
        }

    }
    if (!loading || error.length > 0) {
        return (
            <Container>
                <Error>{error}</Error>
                {console.log(props.categoriesToNotAllow)}
                {
                    pages.map((ele, i) => {
                        let render = false;
                       
                        props.categoriesToNotAllow.map((notAllowEle: any) => {
                            ele.Categories.map((catEle: any) => {
                                console.log(`${catEle[2]}==${notAllowEle}`)
                                if (catEle[2] == notAllowEle) {
                                    render = true;
                                }
                            })
                        })
                        if (render || props.categoriesToNotAllow.length <= 0) {
                            return <Page ID={ele.PageID} name={ele.Name} img={DefaultImage} para={ele.Para1} key={i} />
                        }
                })
                }
            </Container>
        );
    } else {
        return (
            <LoadingPage />
        )
    }
}

export default SearchBar;
