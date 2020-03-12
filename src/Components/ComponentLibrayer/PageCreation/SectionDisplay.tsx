import React, { ReactNode, Children } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type CompProps = {
    width: string
}
const Component = styled.div<CompProps>`
    margin: 1em auto;
    width: ${p => p.width};
    height: fit-content;
    position: relative;
`;

const ExitModuleContainer = styled.div`
    height: 100%;
    position: absolute;
    left: -3rem;
    top: 0;
    display: flex;
    justify-content: center;
`;

const ExitModule = styled.div`
    width: 2.25rem;
    height: 2.25rem;
    border: thin solid #ff0000;
    font-size: 2em;
    text-align: center;
    font-size: 1.5em;
    color: #ff0000;
    border-radius: 50%;
    line-height: 2.25rem;
    cursor: pointer;
    margin: auto;
    margin-right: 0.2rem;
    &:hover {
        color: #ff5b5b;
    }
`;

type ImageModProps = {
    width: string,
    height: string
}

const ImageMod = styled.img<ImageModProps>`
    width: ${p => p.width};
    min-height: ${p => p.height};
    max-height: 40em;
    height: auto;
    margin: auto 0;
    background-color: grey;
    object-fit: cover;
`;

type Props = {
    id: number,
    children: ReactNode | ReactNode[],
    width?: string,
    deleteSection: any
}

function SectionDisplay(props: Props) {
    const exit = <FontAwesomeIcon icon = {faTimes}/>
    const width = (!props.width ? props.width : "fit-content");
    return (
        <Component width = {width}>
            <ExitModuleContainer>
                <ExitModule onClick = {() => { props.deleteSection(props.id) }}>{exit}</ExitModule>
            </ExitModuleContainer>
            {
                props.children
            }
        </Component>
    )
}

export default SectionDisplay;