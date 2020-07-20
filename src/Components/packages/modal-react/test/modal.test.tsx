import React from 'react';
import styled from 'styled-components';
import { render, fireEvent } from '@testing-library/react';
import testIds from './testIds';
import Modal from '../index';

describe("Categories", () => {
    const onCloseFunction = jest.fn();

    test("if it renders when close is false", () => {
        const { queryByTestId } = render(
            <Modal setClose={() => { }} close={false}>
                not important
            </Modal>
        );
        const container = queryByTestId(testIds.container);
        expect(container).not.toBeNull();

        const closeButton = queryByTestId(testIds.closeButton);
        expect(closeButton).not.toBeNull();
    });

    test("if it does not renders when close is true", () => {
        const { queryByTestId } = render(
            <Modal setClose={() => { }} close={true}>
                not important
            </Modal>
        );
        const container = queryByTestId(testIds.container);
        expect(container).toBeNull();
    });


    test("if close button works", () => {
        const { queryByTestId } = render(
            <Modal setClose={onCloseFunction} close={false}>
                not important
            </Modal>
        );
        const closeButton = queryByTestId(testIds.closeButton);
        fireEvent.click(closeButton);

        expect(onCloseFunction).toBeCalledTimes(1);
    });
})