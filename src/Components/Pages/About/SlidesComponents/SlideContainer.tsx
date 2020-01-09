import React, { useState, ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import Slide from './slide'
import ButtonForTransition from '../TransitionButtons'
import FirstSlide from './FirstSlide'
import SecondSlide from './SecondSlide'

type SlideContainerProps = {
    transformDistance: string
}

const Component = styled.div`
    width: fit-content;
    height: fit-content;
`;

const Content = styled.div<SlideContainerProps>`
    z-index: -10;
    width: 400vw;
    display: flex;
    height: 75%;
    /* margin-left: -300vw; */
    /* transform: translate(-200vw, 0); */
    transform: ${p => 'translate(-' + p.transformDistance + 'vw,0);'};
    transition: transform 1s;
    border: black thin solid;
    position: relative;
`;

type Props = {
    width: string,
    children: ReactNode[]
}

function SlideContainer(props: Props) {
    const { children, width } = props;
    const [slide, setSlide] = useState("0")
    const [clicking, setClicking] = useState(false)
    const [initialPos, setInitialPos] = useState(-1)
    const nothing = 0;

    // useEffect(() => {
    //     let sliderEle = document.getElementById('123456789Slider987654321')
    //     sliderEle.addEventListener('ontouchstart', touchStart)
    //     sliderEle.addEventListener('ontouchmove', touchMove)
    //     sliderEle.addEventListener('ontouchend', touchEnd)
    //     console.log(sliderEle)
    // }, [])

    const touchStart = (e: any) => {
        console.log("touch start")
        setClicking(true)
        console.log(e.clientX)
        console.log(e.clientY)
    }

    const touchMove = (e: any) => {
        if (clicking) {
            console.log("touch move")
        }
    }

    const touchEnd = (e: any) => {
        console.log("touch end")
        setClicking(false)
    }

    const slideTransition = (positive: boolean) => {
        let slideIndex = parseInt(slide) / 100
        if (positive && slideIndex != children.length - 1) {
            setSlide(((slideIndex + 1) * 100) + "")
        } else if (slideIndex != 0) {
            setSlide(((slideIndex - 1) * 100) + "")
        }
    }

    const moveSlideShow = (e: Event) => {
        var ctl = document.getElementById('Javascript_example');
        var startPos = ctl.onselectstart;
        var endPos = ctl.onselectionchange;
        console.log(startPos, endPos)
    }

    return (
        // onClick = {() => {console.log("click")}} onDrag = {() => {console.log("drag")}} onMouseMove = {() => {console.log("mouse move")}}
        <Component onTouchStart={touchStart} onTouchMove={touchMove} onTouchEnd={touchEnd} onMouseDown={touchStart} onMouseMove={touchMove} onMouseLeave={touchEnd} onMouseUp={touchEnd} id="123456789Slider987654321">
            <ButtonForTransition end={(parseInt(slide[0]) == children.length - 1)} start={(parseInt(slide) == 0)} slideTransition={slideTransition} />
            <Content transformDistance={slide}>
                {
                    children.map((ele: ReactNode, i: Number) => {
                        let end = (i == children.length - 1)
                        return (
                            <Slide widthOfPage={width}>
                                {ele}
                            </Slide>);
                    })
                }
            </Content>
        </Component>
    )
}

export default SlideContainer;