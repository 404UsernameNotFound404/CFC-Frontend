import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

type ButtonForSlideTransitionProps = {
    right: boolean
}

const ButtonForSlideTransition = styled.div<ButtonForSlideTransitionProps>`
    position: absolute;
    left: ${p => p.right ? "1em" : "auto"};
    right: ${p => !p.right ? "1em" : "auto"};
    margin: auto;
    height: 75%;
    display: flex;
    justify-content: center;
`;

const ArrowContainer = styled.div`
    padding: 0.5em;
    margin: auto;
    border-radius: 50%;
    /* border: black thin solid; */
    display: flex;
    justify-content: center;
    background-color: #a3dcef;
    transition: all 0.25s;
    border: 0.1em transparent solid;
    &:hover {
        border: 0.1em solid black;
    }
`;

const Component = styled.div`
    z-index: 100;
`;

type Props = {
    slideTransition: Function,
    end: boolean,
    start: boolean
}

function TransitionButtons(props: Props) {
    const arrowRight = <FontAwesomeIcon icon={faArrowRight} />
    const arrowLeft = <FontAwesomeIcon icon={faArrowLeft} />
    return (
        <Component>
            {!props.end ? <ButtonForSlideTransition right={false} onClick={() => { props.slideTransition(true) }}>
                <ArrowContainer>{arrowRight}</ArrowContainer>
            </ButtonForSlideTransition> : ""}
            {!props.start ? <ButtonForSlideTransition right={true} onClick={() => { props.slideTransition(false) }}>
                <ArrowContainer>{arrowLeft}</ArrowContainer>
            </ButtonForSlideTransition> : ""}
        </Component>
    )
}

export default TransitionButtons