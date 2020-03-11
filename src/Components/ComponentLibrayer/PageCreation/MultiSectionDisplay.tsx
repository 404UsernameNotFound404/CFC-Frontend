import React from 'react';
import styled from 'styled-components';

const MultiSection = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    margin: 1em 0;
`;

type Props = {
    sectionData: any,
    whichTypeOfSectionToRender: any
}

function MultiSectionDisplay(props: Props) {
    const {sectionData, whichTypeOfSectionToRender} = props;
    return (
        <MultiSection>
            {
                sectionData.map((ele: any, i: number) => whichTypeOfSectionToRender(ele.type, ele, i))
            }
        </MultiSection>
    )
}

export default MultiSectionDisplay;