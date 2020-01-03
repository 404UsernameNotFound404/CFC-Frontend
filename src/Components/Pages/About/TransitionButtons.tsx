import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

type ButtonForSlideTransitionProps = {
    right: boolean
}

const ButtonForSlideTransition = styled.div<ButtonForSlideTransitionProps>`
    position: absolute;
    left: ${p => p.right ? "0" : "auto"};
    right: ${p => !p.right ? "0" : "auto"};
    margin: auto;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const ArrowContainer = styled.div`
    padding: 0.5em;
    margin: auto;
    border-radius: 50%;
    border: black thin solid;
    display: flex;
    justify-content: center;
    background-color: #a3dcef;
`;

type Props = {
    slideTransition: Function,
    end: boolean,
    start: boolean
}

function TransitionButtons(props: Props) {
    const arrowRight = <FontAwesomeIcon icon={faArrowRight} />
    const arrowLeft =  <FontAwesomeIcon icon={faArrowLeft} />
    return (
        <>
            {!props.end ? <ButtonForSlideTransition right={false} onClick={() => { props.slideTransition(true) }}>
                <ArrowContainer>{arrowRight}</ArrowContainer>
            </ButtonForSlideTransition> : ""}
            {!props.start ? <ButtonForSlideTransition right={true} onClick={() => { props.slideTransition(false) }}>
                <ArrowContainer>{arrowLeft}</ArrowContainer>
            </ButtonForSlideTransition> : ""}
        </>
    )
}

export default TransitionButtons