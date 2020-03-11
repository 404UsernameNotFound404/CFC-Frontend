import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignRight, faAlignCenter, faAlignLeft } from '@fortawesome/free-solid-svg-icons'

const Component = styled.div`
    position: absolute;
    right: 0;
    top: -1.4em;
    height: 1.4em;
    display: flex;
    /* background-color: lightgray; */
`;

type IconContainerProps = {
    selected: boolean
}

const IconContainer = styled.div<IconContainerProps>`
    height: 95%;
    margin: auto;
    cursor: pointer;
    color: darkgrey;
    ${p => p.selected ? `
    color: blue;
    background-color: lightblue;
    `
        : ''}
`;

const Icon = styled.h4`
    font-size: 1em;
    color: inherit;
    margin: auto;
    padding: 2% 0.2em;
`;

type Props = {
    setFocus: any,
    switchOrientation: any,
    menuRef: any
}

function ParaInputMenu(props: Props) {
    const { setFocus } = props;
    const [iconSelected, setIconSelected] = useState(0);

    const alignRight = <FontAwesomeIcon icon={faAlignRight} />
    const alignLeft = <FontAwesomeIcon icon={faAlignLeft} />
    const alignCenter = <FontAwesomeIcon icon={faAlignCenter} />

    const icons = [
        {icon: alignLeft, id: 0, value: "left"},
        {icon: alignCenter, id: 1, value: "center"},
        {icon: alignRight, id: 2, value: "right"}
    ];

    const switchOrientation = (id: number, value: string) => {
        setIconSelected(id);
        props.switchOrientation(value);
    }

    return (
        <Component ref = {props.menuRef} onFocus={() => { setFocus(true); console.log("happening") }} onBlur={() => { setFocus(false) }} >
            {
                icons.map(ele => <IconContainer onClick = {() => switchOrientation(ele.id, ele.value)} selected={iconSelected == ele.id}><Icon>{ele.icon}</Icon></IconContainer>)
            }
        </Component>
    );
}

export default ParaInputMenu;