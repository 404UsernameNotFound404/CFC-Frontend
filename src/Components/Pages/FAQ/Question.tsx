import React from 'react'
import styled from 'styled-components'

const Component = styled.div``;

const QuestionStyle = styled.h1`
    color: #848484;
    font-size: 1.8em;
`;

const QuestionContent = styled.span`
    color: black;
`;

const Answer = styled.p`
    margin: 0;
    margin-left: 2em;
    font-size: 1.5em;
`;

type Props = {
    question: string,
    answer: string
}

function Question(props: Props) {
    const {question, answer} = props;
    return (
        <Component>
            <QuestionStyle>Question: <QuestionContent>{question}</QuestionContent></QuestionStyle>
            <Answer>{answer}</Answer>
        </Component>
    )
}

export default Question;