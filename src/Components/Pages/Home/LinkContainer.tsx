import React from 'react';
import styled from 'styled-components';

type ComContainerProps = {
    left: boolean,
    backgroundImage: any,
}

const ComContainer = styled.div<ComContainerProps>`
   /* border-left: ${p => p.left ? '' : 'solid black 0.125em'};
   border-right: ${p => p.left ? 'solid black 0.125em' : ''};
   border-top: solid black 0.25em;
   border-bottom: solid black 0.25em; */
    /* margin-left: ${p => p.left ? '' : '1.25%'};
   margin-right: ${p => p.left ? '1.25%' : ''}; */
   margin: 1em 1.25%;
   width: 45%;
   height: 20em;
   background-image: url(${p => p.backgroundImage});
   background-size: 100% 100%;
   display: flex;
   justify-content: center;
`;

const Button = styled.h1`
    cursor: pointer;
    text-align: center;
    margin: auto;
    min-width: 25%;
    background-color: #4aa84e;
    width: fit-content;
    padding: 0.25em 1em;
    color: white;
    border-radius: 1em;
    &:hover {
        background-color: #248328;
    }
`;

type Props = {
    desc: string,
    backgroundImage: any,
    left: boolean;
}

function LinksContainer(props: Props) {
    return (
        <ComContainer backgroundImage={props.backgroundImage} left={props.left}>
            <Button>{props.desc}</Button>
        </ComContainer>
    );
}

export default LinksContainer;
