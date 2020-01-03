import React, { useState, ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import Slide from './slide'
import ButtonForTransition from '../TransitionButtons'
import FirstSlide from './FirstSlide'
import SecondSlide from './SecondSlide'

type SlideContainerProps = {
    transformDistance: string
}

const Component = styled.div<SlideContainerProps>`
    width: 400vw;
    display: flex;
    height: 70%;
    /* margin-left: -300vw; */
    /* transform: translate(-200vw, 0); */
    transform: ${p => 'translate(-' + p.transformDistance + 'vw,0);'};
    transition: transform 1s;
    border: black thin solid;
`;

type Props = {
    width: string,
    children: ReactNode
}

function SlideContainer(props: Props) {
    const [slide, setSlide] = useState("0")

    const slideTransition = (positive: boolean) => {
        let slideIndex = parseInt(slide) / 100
        if (positive && slideIndex != 3) {
            setSlide(((slideIndex + 1) * 100) + "")
        } else if (slideIndex != 0) {
            setSlide(((slideIndex - 1) * 100) + "")
        }
    }

    return (
        <Component transformDistance={slide}>
            <Slide widthOfPage="65em">
                <ButtonForTransition end = {false} start = {true} slideTransition={slideTransition} />
                <FirstSlide />
            </Slide>
            {/* {
                props.children.map((ele: ReactNode) => {
                    return (
                    <Slide widthOfPage="65em">
                        <ButtonForTransition end = {false} start = {false} slideTransition={slideTransition} />
                        {ele}
                    </Slide>
                    );
                })
            } */}
            <Slide widthOfPage="65em">
                <ButtonForTransition end = {false} start = {false} slideTransition={slideTransition} />
            </Slide>
            <Slide widthOfPage="65em">
                <ButtonForTransition end = {true} start = {false}  slideTransition={slideTransition} />
            </Slide>
        </Component>
    )
}

export default SlideContainer;