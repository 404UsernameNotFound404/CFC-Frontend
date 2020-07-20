import React from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive';

const Component = styled.div``;

const QuestionStyle = styled.h1`
    color: #848484;
    font-size: 1.7em;
    font-family: 'Scope One', serif;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        font-size: 1.5em;
        margin: 0;
    }
`;

const QuestionContentSpan = styled.span`
    color: black;
`;

const QuestionContent = styled.h1`
    color: black;
    font-size: 1.5em;
    margin: 0;
    margin-bottom: 1em;
`;

const Answer = styled.p`
    margin: 0;
    margin-left: 2em;
    font-size: 1.5em;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        margin-left: 0;
        margin-bottom: 1em;
    }
`;

type Props = {
    question: string,
    answer: string
}

function Question(props: Props) {
    const { question, answer } = props;
    const isPhone = useMediaQuery({minDeviceWidth: parseInt(process.env.REACT_APP_PHONE_BREAK)})
    return (
        <Component>
            {!isPhone ? <>
                <QuestionStyle>Question:</QuestionStyle>
                <QuestionContent>{question}</QuestionContent>
            </>
                : <QuestionStyle>Question: <QuestionContentSpan>{question}</QuestionContentSpan></QuestionStyle>}
            <Answer>{answer}</Answer>
        </Component>
    )
}

export default Question;