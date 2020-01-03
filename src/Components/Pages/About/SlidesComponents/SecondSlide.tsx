import React from 'react'
import styled from 'styled-components'
import FNFCS from '../../../../img/FNFCS.png'

const Component = styled.div`
    height: fit-content;
    margin: auto;
    margin-top: 5%;
`;

const FirstSentence = styled.h1`
    font-size: 1.7em;
    text-align: center;
`;

const FNFCSLogo = styled.img`
    width: 12em;
    height: 12em;
    display: block;
`;

const FNFCSContainer = styled.div`
    width: fit-content;
    display: flex;
    margin: auto;
`;

const FNFCSTitle = styled.h1`
    font-size: 1.5em;
    width: 10em;
    margin: auto;
`;

function SecondSlide() {
    return (
        <Component>
            <FirstSentence>They had a lot of support from their teachers, and from groups like the </FirstSentence>
            <FNFCSContainer>
                <FNFCSLogo src = {FNFCS}/>
                <FNFCSTitle>First Nation Family Caring Soceity(F.N.F.C.S)</FNFCSTitle>
            </FNFCSContainer>
            <FirstSentence>By 2017 both Henry and Daxton were noticing that many people wanted to learn more, and get more involved, but did not have the same support they had received, or did not know how to take action. </FirstSentence>
        </Component>
    )
}

export default SecondSlide;