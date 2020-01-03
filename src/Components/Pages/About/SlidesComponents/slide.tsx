import React, { ReactElement, ReactNode, useEffect, Children } from 'react'
import styled from 'styled-components'

const ComponentStyle = styled.div`
    width: 100vw;
    height: 100%;
`;

type ContentStyle = {
    widthOfPage: string
}

const Content = styled.div<ContentStyle>`
    width: ${p => p.widthOfPage};
    margin: auto;
    position: relative;
    height: 100%;
`;

type Props = {
    widthOfPage: string,
    children: ReactNode
}

function Slide(props: Props) {
    return (
        <ComponentStyle>
            <Content widthOfPage = {props.widthOfPage}>
                {props.children}
            </Content>
        </ComponentStyle>
    )
}

export default Slide;