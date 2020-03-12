import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignRight, faAlignCenter, faAlignLeft, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import ParaInputMenuItem from './ParaInputMenuItem';

const Component = styled.div`
    position: absolute;
    right: 0;
    top: -1.7rem;
    height: 1.7rem;
    width: fit-content;
    display: flex;
    /* background-color: lightgray; */
`;

const Spacer = styled.div`
    width: 0.25rem;
`;


type Props = {
    setFocus: any,
    switchOrientation: any,
    menuRef: any,
    increaseDecreaseFont: any
}

function ParaInputMenu(props: Props) {
    const { setFocus, increaseDecreaseFont } = props;
    const [iconSelected, setIconSelected] = useState(0);

    const alignRight = <FontAwesomeIcon icon={faAlignRight} />
    const alignLeft = <FontAwesomeIcon icon={faAlignLeft} />
    const alignCenter = <FontAwesomeIcon icon={faAlignCenter} />
    const plus = <FontAwesomeIcon icon={faPlus} />
    const minus = <FontAwesomeIcon icon={faMinus} />

    const iconsAlign = [
        { icon: alignLeft, id: 0, value: "left" },
        { icon: alignCenter, id: 1, value: "center" },
        { icon: alignRight, id: 2, value: "right" }
    ];

    const iconsPlusMinus = [
        { icon: plus, value: 0 },
        { icon: minus, value: 1 }
    ]

    const switchOrientation = (value: string, id: number) => {
        setIconSelected(id);
        props.switchOrientation(value);
    }

    const fontSizeChange = (value: number, id: number) => {
        props.increaseDecreaseFont(value);
    }

    return (
        <Component ref={props.menuRef} onFocus={() => { setFocus(true); console.log("happening") }} onBlur={() => { setFocus(false) }} >
            {
                iconsAlign.map((ele, i) => <ParaInputMenuItem key = {i} icon = {ele.icon} value = {ele.value} align = {true} id = {ele.id} onClickFunct = {switchOrientation} selected = {iconSelected == ele.id} />)
            }
            <Spacer />
            {
                iconsPlusMinus.map((ele, i) => <ParaInputMenuItem key = {i} icon = {ele.icon} value = {ele.value} align = {false} id = {null} onClickFunct = {fontSizeChange} selected = {false} />)
            }
        </Component>
    );
}

export default ParaInputMenu;