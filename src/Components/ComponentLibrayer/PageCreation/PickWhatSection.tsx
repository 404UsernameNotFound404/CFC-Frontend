import React from 'react';
import styled from 'styled-components';

const Component = styled.div`
    padding: 1em 0;
    padding-bottom: 2em;
    width: 100%;
    height: fit-content;
`;

const Title = styled.h4`
    font-size: 1.5em;
    margin: 0.5em;
    margin-left: 2.5%;
`;

type ChoicesProps = {
    width: string
}

const Choices = styled.div<ChoicesProps>`
    display: flex;
    justify-content: space-between;
    width: ${p => p.width};
    margin: auto;
`;

const ChoiceB = styled.div`
    width: 8em;
    background-color: #4426ff;
    border-radius: 0.25em;
    text-align: center;
    padding: 0.5em 0;
    color: white;
    cursor: pointer;
    font-size: 1.25em;
    &:hover {
        background-color: navy;
    }
`;

const ChoiceLayout = styled.div`
    width: 15em;
    height: 8em;
    border: 0.5em black solid;
    border-radius: 0.25em;
    display: flex;
    justify-content: space-evenly;
    cursor: pointer;
    &:hover {
        background-color: rgb(240, 240, 240);
    }
`;

const ChoiceBar = styled.div`
    height: 100%;
    width: 0.6em;
    background-color: black;
`;

type Props = {
    choice: any,
    setWhatToCreate: any
}

function PickWhatSection(props: Props) {
    const { choice, setWhatToCreate} = props;
    return (
        <Component>
            <Title>Full Section</Title>
            <Choices width={"95%"}>
                <ChoiceB>Youtube Video</ChoiceB>
                <ChoiceB onClick={() => { choice(1, { width: '100%', height: '20em', img: "" }) }}>Image</ChoiceB>
                <ChoiceB onClick={() => { choice(0, { text: "Write your text here...", textAlign: 'center' }) }}>Text</ChoiceB>
            </Choices>
            <Title>Split Section</Title>
            <Choices width={"85%"}>
                <ChoiceLayout onClick = {() => {setWhatToCreate(1)}}>
                    <ChoiceBar />
                </ChoiceLayout>
                <ChoiceLayout onClick = {() => {setWhatToCreate(2)}}>
                    <ChoiceBar />
                    <ChoiceBar />
                </ChoiceLayout>
            </Choices>
        </Component>
    )
}

export default PickWhatSection;