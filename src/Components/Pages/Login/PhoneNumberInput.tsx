import React, { useState } from 'react'
import styled from 'styled-components'

const Component = styled.div``;

const Title = styled.h1`
    font-size: 1em;
    color: grey;
    margin: 0;
`;

const InputContainer = styled.div`
    display: flex;
`;

type InputStyle = {
    width: string
}

const InputStyle = styled.input<InputStyle>`
    width: ${p => p.width}%;
    margin: 0.5em auto;
    font-size: 1.1em;
    border: none;
    background-color: transparent;
    border-bottom: thin solid grey;
    text-align: center;
    &:focus {
        outline: none;
    }
`;

const Breaker = styled.p`
    width: 5%;
`;

type Props = {
    phoneNumber: {first: string, middle: string, end: string}
    setPhoneNumber: Function
}

function PhonNumberInput(props: Props) {
    const { setPhoneNumber, phoneNumber } = props;

    const threeDigitInput = (e: any, input1: boolean) => {
        const { value } = e.target
        if (value.length <= 3 && !isNaN(value)) {
            if (input1) {
                setPhoneNumber({...phoneNumber, first: value})
            } else {
                setPhoneNumber({...phoneNumber, middle: value})
            }
        }
    }

    const fourDigitInput = (e: any) => {
        const { value } = e.target
        if (value.length <= 4 && !isNaN(value)) {
            setPhoneNumber({...phoneNumber, end: value})
        }
    }

    return (
        <Component>
            <Title>Phone Number</Title>
            <InputContainer>
                <InputStyle width={"15"} value={phoneNumber.first} onChange={(e: any) => { threeDigitInput(e, true) }} />
                <Breaker>-</Breaker>
                <InputStyle width={"15"} value={phoneNumber.middle} onChange={(e: any) => { threeDigitInput(e, false) }} />
                <Breaker>-</Breaker>
                <InputStyle width={"25"} value={phoneNumber.end} onChange={fourDigitInput} />
            </InputContainer>
        </Component>
    )
}

export default PhonNumberInput;