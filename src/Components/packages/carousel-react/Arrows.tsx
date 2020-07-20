import React from 'react';
import styled from 'styled-components';
import testIds from './test/testIds';
import { IoIosArrowForward } from 'react-icons/io';

const ArrowContainer = styled.div<any>`
    position: absolute;
    ${p => p.isRightArrow ? "right: -5rem" : "left: -5rem"};
    height: 100%;
    top: 0;
    display: flex;
    justify-content: center;
`;

const Arrow = styled(IoIosArrowForward)<any>`
    ${p => p.theme.icon};
    width: 3rem;
    height: 3rem;
    margin: auto;
    ${p => !p.isRightArrow ? "transform: scaleX(-1);" : ""};
`;

function Arrows(props: any) {
    const { moveSlide } = props;

    return (
        <>
            <ArrowContainer isRightArrow={true}>
                <Arrow data-testid={testIds.arrowRight} onClick={() => { moveSlide(true) }} isRightArrow={true} />
            </ArrowContainer>
            <ArrowContainer isRightArrow={false}>
                <Arrow data-testid={testIds.arrowLeft} onClick={() => { moveSlide(false) }} isRightArrow={false} />
            </ArrowContainer>
        </>
    );
}

export default Arrows;
