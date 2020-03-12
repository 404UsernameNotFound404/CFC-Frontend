import React, { useState } from 'react';
import styled from 'styled-components';
import TwoLayout from '../../../img/SectionTwoLayout.svg'
import PickWhatSection from './PickWhatSection';
import MultiSection from './MultiSection';

type Props = {
    choice: any,
}

function PickModule(props: Props) {
    return (
        <MultiSection numberOfSection={2} />
    )
}

export default PickModule;