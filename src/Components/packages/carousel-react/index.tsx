import React, { useEffect } from 'react';
import styled from 'styled-components';
import testIds from './test/testIds';
import Slide from './slide';
import { useState } from 'react';
import Arrows from './Arrows';
import Dots from './Dots';

const Component = styled.div`
    width: fit-content;
    position: relative;
`;

const Slides = styled.div<any>`
    width: ${p => p.width}px;
    overflow: hidden;
    flex: wrap;
`;

const SlidesContent = styled.div<any>`
    display: flex;
    transform: translateX(${p => p.transformValue + "px"});
    ${p => p.dragging ? "" : "transition: transform 1s;"}
    width: 100%;
`;

export const removeLetters = (string: string) => {
    for (let x = 0; x < string.length; x++) {
        if (isNaN(string[x] as any)) {
            string = removeChar(string, x)
            x--;
        }
    }
    return string
}

const removeChar = (string: any, char: any) => {
    if (char > string.length - 1 || char < 0) return "-1"
    return string.substring(0, char) + string.substring(char + 1, string.length);
}

const findSlideToGo = (width: any, posX: any, numberOfSlides: any) => {
    let numberOfWidths = Math.round(posX / width) * -1;
    if ((posX > (numberOfWidths - 1) * width) && (posX < ((numberOfWidths - 1) * width) + (width / 2))) numberOfWidths--;
    if ((posX < (numberOfWidths + 1) * width) && (posX > ((numberOfWidths + 1) * width) - (width / 2))) numberOfWidths++;
    if (numberOfWidths > numberOfSlides) return numberOfSlides;
    if (numberOfWidths < 0) return 0;
    return numberOfWidths;
}

function MainTitleCard(props: any) {
    const [transformValue, setTransformValue] = useState(0);
    const [width, setWidth] = useState(props.width);
    const [clicked, setClicked] = useState(false);
    const [lastMousePosition, setLastMousePosition] = useState(-1);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        setWidth(parseFloat(removeLetters(width)) * 16)
    }, [])

    const moveSlideBool = (moveRight: any) => {
        let newSlide = currentSlide;
        if (moveRight && (newSlide + 1) < props.children.length) newSlide++;
        if (!moveRight && (newSlide - 1) >= 0) newSlide--;
        setTransformValue(newSlide * width * -1);
        setCurrentSlide(newSlide)
    }

    const moveSlideIndex = (index: any) => {
        setTransformValue(index * width * -1);
        setCurrentSlide(index)
    }

    const slidesClicked = (e: any) => {
        setClicked(true);
        setLastMousePosition(e.pageX)
    }

    const stopMovingSlidesWithMouse = (e: any) => {
        if (clicked) {
            setClicked(false);
            let diff = e.pageX - lastMousePosition;
            let slideToGoTo = findSlideToGo(width, transformValue + diff, props.children.length - 1)
            setTransformValue(slideToGoTo * width * -1);
            setCurrentSlide(slideToGoTo)
        }
    }

    const slideMovedWithMouse = (e: any) => {
        if (clicked) {
            let diff = e.pageX - lastMousePosition;
            if ((transformValue + diff) < 0) setTransformValue((prev: any) => prev + diff)
            setLastMousePosition(e.pageX);
        }
    }


    return (
        <Component data-testid={testIds.container}>
            <Slides width={width} onMouseMove={slideMovedWithMouse} onMouseLeave={stopMovingSlidesWithMouse} onMouseUp={stopMovingSlidesWithMouse} onMouseDown={slidesClicked}>
                <SlidesContent data-testid={testIds.slidesContent} dragging={clicked} transformValue={transformValue}>
                    {
                        props.children.map((ele: any, i: any) => <Slide height = {props.height} width={width} key={i}>{ele}</Slide>)
                    }
                </SlidesContent>
            </Slides>
            <Arrows moveSlide={moveSlideBool} />
            <Dots numberOfSlides={props.children.length} currentSlide={currentSlide} moveSlide={moveSlideIndex} />
        </Component>
    );
}

export default MainTitleCard;
