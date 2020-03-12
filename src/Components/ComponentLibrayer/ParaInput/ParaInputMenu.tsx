import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignRight, faAlignCenter, faAlignLeft } from '@fortawesome/free-solid-svg-icons'
import ParaInputMenuItem from './ParaInputMenuItem';

const Component = styled.div`
    position: absolute;
    right: 0;
    top: -1.7rem;
    height: 1.7rem;
    width: fit-content;
    display: flex;
    background-color: white;
`;

const Spacer = styled.div`
    width: 0.25rem;
`;


type Props = {
    setFocus: any,
    switchOrientation: any,
    menuRef: any,
    increaseDecreaseFont: any,
    show: boolean
}

function ParaInputMenu(props: Props) {
    const { setFocus, show } = props;
    const [iconSelected, setIconSelected] = useState(0);
    const [textIconSelected, setTextIconSelected] = useState(1);

    const alignRight = <FontAwesomeIcon icon={faAlignRight} />
    const alignLeft = <FontAwesomeIcon icon={faAlignLeft} />
    const alignCenter = <FontAwesomeIcon icon={faAlignCenter} />

    const iconsAlign = [
        { icon: alignLeft, id: 0, value: "left" },
        { icon: alignCenter, id: 1, value: "center" },
        { icon: alignRight, id: 2, value: "right" }
    ];

    const iconsPlusMinus = [
        { icon: "T", value: 0, fontSize: '1.25rem'},
        { icon: "T", value: 1, fontSize: '0.75rem'}
    ]

    const switchOrientation = (value: string, id: number) => {
        setIconSelected(id);
        props.switchOrientation(value);
    }

    const fontSizeChange = (value: number, id: number) => {
        setTextIconSelected(value);
        props.increaseDecreaseFont(value);
    }


    if (show) {
        return (
            <Component ref={props.menuRef} onFocus={() => { setFocus(true); console.log("happening") }} onBlur={() => { setFocus(false) }} >
                {
                    iconsAlign.map((ele, i) => <ParaInputMenuItem textIcon = {false} fontSize = {"1.5rem"} key = {i} icon = {ele.icon} value = {ele.value} align = {true} id = {ele.id} onClickFunct = {switchOrientation} selected = {iconSelected == ele.id} />)
                }
                <Spacer />
                {
                    iconsPlusMinus.map((ele, i) => <ParaInputMenuItem textIcon = {true} fontSize = {ele.fontSize} key = {i} icon = {ele.icon} value = {ele.value} align = {false} id = {null} onClickFunct = {fontSizeChange} selected = {textIconSelected == ele.value} />)
                }
            </Component>
        );
    } else {
        return (
            <></>
        )
    }
    
}

export default ParaInputMenu;