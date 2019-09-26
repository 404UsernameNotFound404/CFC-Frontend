import React, { useState } from 'react';
import styled from 'styled-components';

import BasicButton from '../../ComponentLibrayer/BasicButton';

const Container = styled.div`
    width: 90%;
    height: fit-content;
    margin: auto;
    padding-bottom: 2em;
    display: flex;
    flex-wrap: wrap;
`;

type Props = {
    text: string,
}

type CategoryButtonArray = { text: string, normalColor: string, highLightColor: string, active: boolean, id: number }[];

function CategorySearch(props: Props) {
    type CategoryButtonArrayType = { text: string, normalColor: string, highLightColor: string, active: boolean, id: number }[];
    const [categoryButtons, setCategoryButtons] = useState([
        { text: 'Envorment Action', normalColor: '#a4c2f4', highLightColor: '#3c78d8', active: false, id: 0 },
        { text: 'Racial Justice', normalColor: '#a4c2f4', highLightColor: '#3c78d8', active: false, id: 2 },
        { text: 'LGBTQ', normalColor: '#a4c2f4', highLightColor: '#3c78d8', active: false, id: 3 },
        { text: 'Feminsim', normalColor: '#a4c2f4', highLightColor: '#3c78d8', active: false, id: 4 }
    ]);

    const activateButton = (id: number) => {
        let newArray: any = categoryButtons.map(ele => {
            if (ele.id === id) {
                (ele.active) ? (ele.active = false) : (ele.active = true);
            }
            return ele;
        });
        setCategoryButtons(newArray);
    }

    return (
        <Container>
            {categoryButtons.map((ele) => <BasicButton width = {"22.5%"} activateButton={activateButton} text={ele.text} active={ele.active} id={ele.id} />)}
        </Container>
    );
}

export default CategorySearch;
