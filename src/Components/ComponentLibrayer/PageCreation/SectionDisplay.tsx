import React, { ReactNode, Children } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

type CompProps = {
    width: string
}
const Component = styled.div<CompProps>`
    margin: 1em auto;
    width: ${p => p.width};
    height: fit-content;
    position: relative;
`;

const ModuleIconContainer = styled.div`
    margin: auto;
    position: absolute;
    left: -3rem;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
`;

type ModuleIconProps = {
    colour: string
}

const ModuleIcon = styled.div<ModuleIconProps>`
    width: 2.25rem;
    height: 2.25rem;
    border: thin solid ${p => p.colour};
    font-size: 2em;
    text-align: center;
    font-size: 1.5em;
    color: ${p => p.colour};
    border-radius: 50%;
    line-height: 2.25rem;
    cursor: pointer;
    margin: 0.5em auto;
    margin-right: 0.2rem;
    opacity: 0.9;
    &:hover {
        opacity: 1;
    }
`;

const ModuleIconSpacer = styled.div`
    height: 2.25rem;
`;

const ModuleIconContent = styled.div`
    margin: auto;
    height: fit-content;
    width: 100%;
`;

type Props = {
    id: number,
    children: ReactNode | ReactNode[],
    width?: string,
    deleteSection: any,
    moveSection: any,
    index: number,
    numberOfSections: number
}

function SectionDisplay(props: Props) {
    const exit = <FontAwesomeIcon icon={faTimes} />
    const arrowUp = <FontAwesomeIcon icon={faArrowUp} />
    const arrowDown = <FontAwesomeIcon icon={faArrowDown} />
    const width = (props.width ? props.width : "fit-content");
    return (
        <Component width={width}>
            <ModuleIconContainer>
                <ModuleIconContent>
                    {props.index == 0 ? " " : <ModuleIcon colour={"blue"} onClick={() => { props.moveSection(props.id, true) }}>{arrowUp}</ModuleIcon>}
                    <ModuleIcon colour={"#ff0000"} onClick={() => { props.deleteSection(props.id) }}>{exit}</ModuleIcon>
                    {props.index == props.numberOfSections - 1 ? <ModuleIconSpacer /> : <ModuleIcon colour={"blue"} onClick={() => { props.moveSection(props.id, false) }}>{arrowDown}</ModuleIcon>}
                </ModuleIconContent>
            </ModuleIconContainer>
            {
                props.children
            }
        </Component>
    )
}

export default SectionDisplay;