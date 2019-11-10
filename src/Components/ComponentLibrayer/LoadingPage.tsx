import React from 'react';
import styled from 'styled-components';
import LoadingGif from '../../img/loading.gif'

const Content = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`;

const LoadingImage = styled.img`
    display: block;
    margin: auto;
    width: 40%;
    height: auto;
`;

function LoadingPage() {
    return (
        <Content>
            <LoadingImage src = {LoadingGif} />
        </Content>
    );
} 

export default LoadingPage