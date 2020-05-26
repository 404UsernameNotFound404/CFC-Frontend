import React, { useState } from 'react';
import styled from 'styled-components';
import BasicButton from '../../../packages/BasicButton';
import PageCategories from '../../Page/PageCategories';
import { Redirect } from 'react-router-dom';

const Component = styled.div`
    width: 40%;
    border: darkgrey 0.25em solid;
    border-radius: 1em;
    transition: all 0.25s ease-in-out;
    &:hover {
        border-color: black;
    }
`;

const Title = styled.h4`
    font-size: 1.8em;
    margin: 0;
    margin-top: 1em;
    margin-bottom: -0.1em;
    margin-left: 5%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /* number of lines to show */
`;

const BlackLineSeparator = styled.div`
    margin: 0.5em auto;
    width: 90%;
    height: 0.25em;
    margin-bottom: 1.5em;
    background-color: black;
`;

const EventImage = styled.img`
    width: 90%;
    margin: 0 auto;
    display: block;
    height: 10em;
    object-fit: cover;
`;

const EventDesc = styled.p`
    width: 90%;
    margin: 0.5em auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* number of lines to show */
`;

const WhereAndWhen = styled.div`
    display: flex;
    width: fit-content;
    margin: 0 auto;
`;

const TextWhereAndWhen = styled.h4`
    font-size: 1.05em;
    margin: 0 1em;
    margin-top: 0.5em;
    color: darkgrey;
`;

const TextWherAndWhenSpan = styled.span`
    color: black;
`;

const PageCategoryContainer = styled.div`
    margin-left: 5%;
`;

type Props = {
    id: string,
    where: string,
    when: string,
    title: string,
    img: string,
    desc: string,
    categories: { Name: string, Colour: string, ID: string }[]
}

function Event(props: Props) {
    const [goToEventPage, setGoToEventPage] = useState(false);
    return (
        <Component>
            {goToEventPage ? <Redirect to = {'/event?id=' + props.id} /> : ''}
            <Title>{props.title}</Title>
            <BlackLineSeparator />
            <EventImage src={props.img} />
            <EventDesc>{props.desc}</EventDesc>
            <WhereAndWhen>
                <TextWhereAndWhen>Where: <TextWherAndWhenSpan>{props.where}</TextWherAndWhenSpan></TextWhereAndWhen>
                <TextWhereAndWhen>When: <TextWherAndWhenSpan>{props.when}</TextWherAndWhenSpan></TextWhereAndWhen>
            </WhereAndWhen>
            <PageCategoryContainer>
                <PageCategories allCategories = {[]} setAllCategories = {null} editMode={false} categories={props.categories} width={"90%"} />
            </PageCategoryContainer>
            <BasicButton activateButton={() => {setGoToEventPage(true)}} width={"50%"} text={"See More"} active={false} id={20} />
        </Component>
    )
}

export default Event;