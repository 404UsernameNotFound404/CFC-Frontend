import React from './node_modules/react';
import { render, fireEvent, waitForDomChange } from './node_modules/@testing-library/react';
import testIds from './testIds';
import Carousel, { removeLetters } from '../index';
import getStyle from '../../TestingFunctions/getStyle';

const width = "30rem";
const height = "25rem";
const fakeSlides = [
    <div>You say goodbye</div>,
    <div>and I say hello</div>,
    <div>hello hello</div>
];

const checkTransformValue = (numberOfWidth, queryByTestId, test) => {
    try {
        const widthNum = (parseInt(removeLetters(width)) * 16) * numberOfWidth;
        const slideContentStyle = getStyle(queryByTestId(testIds.slidesContent));
        let transformValue = removeLetters(slideContentStyle._values.transform);
        //transform value represents what slides it on. Because it moves in increments of the width and the width is * by 16 cause rem
        expect(transformValue).toEqual(widthNum + "")
    } catch (err) {
        //This is to allow tracing were it came from if needed
        console.log(test)
        throw err;
    }
}

describe("ShoppingCart", () => {
    
    test("Make sure it renders", () => {
        const { queryByTestId } = render(
            <Carousel width={width} height={height}>
                {fakeSlides}
            </Carousel>
        );

        const carousel = queryByTestId(testIds.container);
        expect(carousel).not.toBeNull();

        const slideContent = queryByTestId(testIds.slidesContent);
        expect(slideContent).not.toBeNull();

        const arrowRight = queryByTestId(testIds.arrowRight);
        expect(arrowRight).not.toBeNull();

        const arrowLeft = queryByTestId(testIds.arrowLeft);
        expect(arrowLeft).not.toBeNull();
    });

    test("Make sure it renders right number of dots", () => {
        const { queryByTestId } = render(
            <Carousel width={width} height={height}>
                {fakeSlides}
            </Carousel>
        );

        let dot = null;
        for (let x = 0; x < fakeSlides.length; x++) {
            dot = queryByTestId(testIds.dot + x);
            expect(dot).not.toBeNull();
            dot = null;
        }
    });

    test("Arrow Clicked Right Moves Slide Right", async () => {
        const { queryByTestId } = render(
            <Carousel width={width} height={height}>
                {fakeSlides}
            </Carousel>
        );

        const arrowRight = queryByTestId(testIds.arrowRight);
        fireEvent.click(arrowRight);

        checkTransformValue(1, queryByTestId)
    });

    test("Arrow Left Moves Left", () => {
        const { queryByTestId } = render(
            <Carousel width={width} height={height}>
                {fakeSlides}
            </Carousel>
        );

        //I have to move right
        const arrowRight = queryByTestId(testIds.arrowRight);
        fireEvent.click(arrowRight);

        const arrowLeft = queryByTestId(testIds.arrowLeft);
        fireEvent.click(arrowLeft);

        checkTransformValue(0, queryByTestId)
    });

    test("Arrow Left Does Not Move Past Zero Slide", () => {
        const { queryByTestId } = render(
            <Carousel width={width} height={height}>
                {fakeSlides}
            </Carousel>
        );

        const arrowLeft = queryByTestId(testIds.arrowLeft);
        fireEvent.click(arrowLeft);

        checkTransformValue(0, queryByTestId)
    });

    test("Arrow Right Does Not Move Past Last Slide", () => {
        const { queryByTestId } = render(
            <Carousel width={width} height={height}>
                {fakeSlides}
            </Carousel>
        );

        const arrowRight = queryByTestId(testIds.arrowRight);

        //hitting right arrow well over number of slides
        for (let x = 0; x < fakeSlides.length + 6; x++) {
            fireEvent.click(arrowRight);
        }

        checkTransformValue(fakeSlides.length - 1, queryByTestId)
    });

    test("When Dot Clicked Slides Move", async () => {
        const { queryByTestId } = render(
            <Carousel width={width} height={height}>
                {fakeSlides}
            </Carousel>
        );

        const dot = queryByTestId(testIds.dot + 1);
        fireEvent.click(dot);

        checkTransformValue(1, queryByTestId, "When Dot Clicked Slides Move")
    })
})