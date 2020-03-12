import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import WhichModulePicker from '../WhichModulePicker';
import { PageCreationContext } from '../../../../Context/PageCreationContext';

const Content = styled.div`
    border: 1em black solid;
    display: flex;
`;

const Component = styled.div`
    width: 90%;
    padding: 1em 0;
    margin: auto;
`;

const ConfirmButton = styled.div`
    background-color: #46f646;
    width: 5em;
    height: 2em;
    line-height: 2em;
    font-size: 1.25em;
    text-align: center;
    font-size: 1.5em;
    color: white;
    border-radius: 0.25em;
    cursor: pointer;
    margin: 0.5em 0;
    &:hover {
        background-color: #0bd50b;
    }
`;

type Props = {
    numberOfSection: number
}

function MultiSection(props: Props) {
    const c = useContext(PageCreationContext);
    const [choices, setChoices] = useState([]);
    useEffect(() => {
        setChoices([...Array(props.numberOfSection)].map((e, i) => {
            return {textSelected: true, id: i, type: 0}
        }));
    }, []);

    const setTextSelected = (id: number) => {
        setChoices(choices.map(ele => ((ele.id == id) ? {...ele, textSelected: !ele.textSelected, type: (ele.textSelected ? 1 : 0)} : ele)))
    }

    const { numberOfSection } = props;
    return (
        <Component>
            <Content>
            {
                choices.map((ele, i) => <WhichModulePicker id = {ele.id} setTextSelected = {setTextSelected} textSelected = {ele.textSelected} borderL={(i != 0)} borderR={((i + 1) != numberOfSection)} width={numberOfSection == 2 ? '50%' : '33%'} key = {ele.id}/>)
            }
            </Content>
            <ConfirmButton onClick = {() => {c.choice(2, choices)}}>Create</ConfirmButton>
        </Component>
    )
}

export default MultiSection;