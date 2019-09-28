import React, { useState } from 'react';
import styled from 'styled-components';
import Cause from './Cause';

const Content = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    justify-content: center;
`;

type Props = {
    causeClicked: Function;
    dropDownItems: { title: string, backgroundColor: string, backgroundColorAct: string, active: boolean, id: number }[],
}

function SelectCauses(props: Props) {
    const sortCauses = () => {
        let arrays: any = [];
        let counter = props.dropDownItems.length - 1;
        let arrayCounter = 0;
        while (counter >= 0) {
            if (counter === 0) {
                arrays[arrayCounter] = [props.dropDownItems[counter]];
                break;
            } else {
                arrays[arrayCounter] = [props.dropDownItems[counter], props.dropDownItems[counter - 1]]
                counter -= 2;
                arrayCounter++;
            }
        }
        console.log(arrays);
        return (
            <Content>
                {
                    arrays.map((ele: any) => {
                        return (
                            <div>
                                {console.log(ele)}
                                {
                                    ele.map((ele1: any, i: number) => <Cause key={i} causeClicked={props.causeClicked} title={ele1.title} active={ele1.active} backgroundColor={ele1.backgroundColor} backgroundColorAct={ele1.backgroundColorAct} id={ele1.id} />)
                                }
                            </div>
                        )
                    })
                }
            </Content>
        )
    }

    return (
        <>
            {sortCauses()}
        </>
    );
}

export default SelectCauses;
