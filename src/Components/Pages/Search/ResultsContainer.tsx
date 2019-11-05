import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from './Page';
import DefaultImage from '../../../img/default.jpg';
import { BASEURL } from '../../../Constants';
import Cookie from 'js-cookie';
const axios = require("axios");


const Container = styled.div`
    width: 90% !important;
    width: fit-content;
    margin: auto;
    display: flex;
    justify-content: center;
    @media (max-width: 768px) { 
        width: 100% !important;
        display: inline-block;
    }
`;

type Props = {
    text: string
}

function SearchBar(props: Props) {
    const [pages, setPages] = useState([]);
    useEffect(() => {
        fetchAPI();
    }, []);

    const fetchAPI = async () => {
        const res = await axios.post(`${BASEURL}/getPages`);
        console.log(res)
        setPages(res.data)
    }
    return (
        <Container>
            {
                pages.map((ele, i) => <Page ID = {ele.PageID}name = {ele.Name} img = {DefaultImage} para = {ele.Para1} key = {i} />)
            }
        </Container>
    );
}

export default SearchBar;
