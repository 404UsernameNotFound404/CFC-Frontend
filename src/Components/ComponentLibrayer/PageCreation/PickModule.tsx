import React, { useState } from 'react';
import styled from 'styled-components';
import TwoLayout from '../../../img/SectionTwoLayout.svg'
import PickWhatSection from './PickWhatSection';
import MultiSection from './MultiSection';

type Props = {
    choice: any,
}

function PickModule(props: Props) {
    const [whatToCreate, setWhatToCreate] = useState(0);
    const { choice } = props;
    switch (whatToCreate) {
        case 0:
            return (
                <PickWhatSection setWhatToCreate = {setWhatToCreate} choice={choice} />
            )
            break;
        case 1:
            return (
                <MultiSection numberOfSection={2} />
            )
            break;
        case 2:
            return (
                <MultiSection numberOfSection={3} />
            )
            break;
        default:
            return (
                <PickWhatSection setWhatToCreate = {setWhatToCreate} choice={choice} />
            )
            break;
    }
}

export default PickModule;