import React from 'react';
import styled from 'styled-components';
import testIds from './test/testIds';

const Component = styled.div`
    margin-top: 1rem;
    display: flex;
    height: 4rem;
    justify-content: center;
    width: 100%;
`;

const Dot = styled.div<any>`
    width: ${p => p.active ? "1rem" : "0.75rem"};
    height: ${p => p.active ? "1rem" : "0.75rem"};
    margin: auto 0;
    border-radius: 50%;
    background-color: ${p => p.active ? "rgb(75,75,75)" : "lightgrey"};
    margin-right: 1rem;
    &:hover {
        ${p => p.active ? "" : `
            background-color: grey;
        `}
    }
`;


function Dots(props: any) {
    const { moveSlide, numberOfSlides, currentSlide } = props;

    return (
        <Component>
            {
                [...Array(numberOfSlides)].map((e, i) => <Dot data-testid={testIds.dot+i} onClick={() => { moveSlide(i) }} active={(currentSlide == i)} key={i} />)
            }
        </Component>
    );
}

export default Dots;
