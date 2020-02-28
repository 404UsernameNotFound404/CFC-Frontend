import React from 'react';
import styled from 'styled-components';
import LoadingGif from '../../img/loading.gif'

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        height: 100vh;
    }
`;

const LoadingImage = styled.img`
    display: block;
    margin: auto;
    width: 40%;
    height: auto;
    @media (max-width: ${process.env.REACT_APP_PHONE_BREAK}px) {
        width: 90%;
    }
`;

function LoadingPage() {
    return (
        <Content>
            <LoadingImage src = {LoadingGif} />
        </Content>
    );
} 

export default LoadingPage