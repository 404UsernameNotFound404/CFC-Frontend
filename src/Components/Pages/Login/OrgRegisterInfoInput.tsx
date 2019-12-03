import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import SelectCauses from './SelectCauses';
import BasicButton from '../../ComponentLibrayer/BasicButton';
import { BASEURL } from '../../../Constants'
import {
    BrowserRouter as Router,
    Redirect
} from "react-router-dom";
import { AppContext } from '../../../Context/AppContext';
import Cookie from 'js-cookie'
import PageCategories from '../Page/PageCategories';

const axios = require('axios')

const Component = styled.div`
    width: 100%;
`;

const ParaInput = styled.textarea`
    padding: 0.2em;
    width: 125%;
    height: 5em;
    margin: auto;
    resize: none;
    overflow: none;
    border: grey solid thin;
    font-size: 1.25em;
    font-family: 'Cormorant Garamond', serif;
    font-style: normal;
`;

const ParaInputTitle = styled.h1`
    font-size: 1.25em;
    width: 30em;
    color: grey;
`;

type Props = {
    description: string,
    setDescription: any,
    categories: any,
    setCategories: any
}

function LoginForm(props: Props) {
        return (
            <Component>
                <ParaInputTitle>Description Of Organization</ParaInputTitle>
                <ParaInput placeholder = {"What do you do? \nWhat are your values?"} value = {props.description} onChange = {(e) => {props.setDescription(e.target.value)}} />
                <PageCategories width = {"10em"} allCategories={props.categories} setAllCategories={props.setCategories} categories={[]} editMode={true} />
            </Component>
        )
}

export default LoginForm;
