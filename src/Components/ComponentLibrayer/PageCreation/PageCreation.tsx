import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../Pages/Page/ContactModal';
import ModulePicker from './/PickModule';
import ParaInput from '../ParaInput';
import { PageCreationContext } from '../../../Context/PageCreationContext';

const Component = styled.div`
    width: 100%;
`;

const AddModule = styled.div`
    background-color: #46f646;
    width: 7em;
    font-size: 2em;
    text-align: center;
    font-size: 1.5em;
    color: white;
    padding: 0.25em 0;
    border-radius: 0.25em;
    cursor: pointer;
    margin-top: 1em;
    &:hover {
        background-color: #0bd50b;
    }
`;

type ImageModProps = {
    width: string,
    height: string
}

const ImageMod = styled.img<ImageModProps>`
    width: ${p => p.width};
    height: ${p => p.height};
    margin: 1em 0;
    background-color: red;
`;

function PageCreation() {
    /*
    data:
    is going to be an array of objects
    each object will have type
    then depending on type will have other data for instance
    type 0 = text
        -Properties: 
            text, text-align, width, id
    type 1 = image
        -Properties:
            width, height, img
    type 2 = few
        -Properties:
            sections:
                //type references ones above
                //width will depend on number of sections e.x 2 = 50%
                //need to figure out id being different from each other
                {id: "", type: 0, width: "", height: "", text: ""}
                {type: 1, width: "", height: "", img: ""}

    */
    const [data, setData] = useState([]);
    const [show, setShow] = useState(true);

    const createWhat = (type: number, sectionData: any) => {
        setShow(false);
        if (type == 2) {
            let sections = [] as any;
            sectionData.map((ele: any) => {
                sections.push({type: ele.type, text: "Write here...", id: Math.floor(Math.random() * 500)})
            })
            setData(data => [...data, { sections: sections, type: type }]);
            return;
        }
        setData(data => [...data, { data: sectionData, type: type }]);
    }

    const updateText = (id: number, newText: string) => {
        setData(data.map(ele => {
            if (ele.type == 2) {
                ele.sections.map((sEle: any) => {
                    if (sEle.type == 0 && sEle.id == id) {
                        return {...sEle, text: newText}
                    }
                });
            }
            return ele;
        }))
    }

    const whichTypeOfSectionToRender = (type: number, sectionData: any) => {
        switch (type) {
            case 0:
                return (
                    <ParaInput pageCreation={true} paragraphValue={sectionData.text} setParagraphValue={null} editMode={true} title={"aww"} margin={"auto"} width={"100%"} />
                )
                break;
            case 1:
                return (
                    <ImageMod width={sectionData.width} height={sectionData.height} src = {sectionData.img} />
                )
                break;
            case 2:
                
                break;
        }
    }

    return (
        <PageCreationContext.Provider value = {{choice: createWhat}}>
            <Component>
                {
                    data.map(ele => whichTypeOfSectionToRender(ele.type, ele.data))
                }
                <AddModule onClick={() => { setShow(true) }}>Add</AddModule>
                {
                    show ?
                        <Modal close={show} setClose={setShow}>
                            <ModulePicker choice={createWhat} />
                        </Modal>
                        : ''
                }

            </Component>
        </PageCreationContext.Provider>
    )
}

export default PageCreation;