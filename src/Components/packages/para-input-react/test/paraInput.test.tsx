import React from 'react';
import styled from 'styled-components';
import { render, fireEvent } from '@testing-library/react';
import testIds from './testIds';
import ParaInput from '../ParaInput';

describe("ParaInput", () => {
    test("if it renders", () => {
        const { queryByTestId } = render(
            <ParaInput paragraphValue={"asdasd"} setParagraphValue={() => { }} editMode={true} title={"hello"} margin={"auto"} width={"100%"} />
        );
        const container = queryByTestId(testIds.container);
        expect(container).not.toBeNull();
    })
});