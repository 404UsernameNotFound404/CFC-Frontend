import React from 'react';
import styled from 'styled-components';

const Component = styled.div<any>`
    width: ${p => p.width}px;
    height: ${p => p.height};
    flex-shrink: 0;
    pointer-events: none;
    display: flex;
    justify-content: center;
`;

function Slide(props:any) {
    const { width, height } = props;
    return (
        <Component height = {height} width={width}>
            {props.children}
        </Component>
    );
}

export default Slide;
