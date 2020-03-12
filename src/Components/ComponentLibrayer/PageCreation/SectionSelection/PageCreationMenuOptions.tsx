import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignCenter, faCamera,  faVideo } from '@fortawesome/free-solid-svg-icons';

const Component = styled.div`
    margin: auto 0;
    display: flex;
`;

type IconProps = {
    opacity: number;
    transitionDelay: number;
    scale: number;
}

const Icon = styled.h4<IconProps>`
    border-radius: 50%;
    width: 2.25rem;
    height: 2.25rem;
    text-align: center;
    line-height: 2.4rem;
    margin: 0 0.2rem;
    opacity: ${p => p.opacity};
    border: grey thin solid;
    transition: all 0.5s linear;
    transition-delay: ${p => p.transitionDelay}s;
    transform: ${p => "scale(" + p.scale + ")"};
    cursor: pointer;
    &:hover {
        border: black thin solid;
    }
`;

type Props = {
    open: boolean,
    createSection: any
}

function PageCreationMenuOptions(props: Props) {
    const text = <FontAwesomeIcon  icon = {faAlignCenter} />
    const photo = <FontAwesomeIcon icon = {faCamera} />
    const video = <FontAwesomeIcon icon = {faVideo} />
    const [first, setFirst] = useState(true);
    const [opacity, setOpacity] = useState(0);
    const [scale, setScale] = useState(0.9);
    const { open, createSection } = props;

    useEffect(() => {
        if (!first) {
            setScale(scale == 0.9 ? 1 : 0.9)
            setOpacity(opacity == 0 ? 1 : 0);
        }
        setFirst(false);
    }, [open]);

    const items = [
        {type: 0, icon: text, transitionDelay: 0},
        {type: 1, icon: photo, transitionDelay: 0.05},
        {type: 3, icon: video, transitionDelay: 0.1}
    ];

    return (
        <Component>
            {
                items.map((ele, i) => <Icon onClick = {() => {createSection(ele.type)}} key = {i} transitionDelay = {ele.transitionDelay} scale = {scale} opacity = {opacity}>{ele.icon}</Icon>)
            }
        </Component>
    );
}

export default PageCreationMenuOptions;