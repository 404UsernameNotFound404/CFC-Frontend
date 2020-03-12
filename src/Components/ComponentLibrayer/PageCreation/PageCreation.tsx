import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../Pages/Page/ContactModal';
import ModulePicker from './/PickModule';
import ParaInput from '../ParaInput';
import { PageCreationContext } from '../../../Context/PageCreationContext';
import MultiSectionDisplay from './MultiSectionDisplay';

const Component = styled.div`
    width: 100%;
`;

const ButtonContainer = styled.div`
    display: flex;
`;

const AddModule = styled.div`
    background-color: #46f646;
    font-size: 2em;
    text-align: center;
    font-size: 1.5em;
    color: white;
    padding: 0.25em 2em;
    border-radius: 0.25em;
    cursor: pointer;
    margin-top: 1em;
    margin-left: 2em;
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
    min-height: ${p => p.height};
    margin: auto 0;
    background-color: red;
`;

const MultiSection = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
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
    const [editMode, setEditMode] = useState(true);

    const createWhat = (type: number, sectionData: any) => {
        setShow(false);
        if (type == 0) {
            setData(data => [...data, { width: "100%", type: type, sections: { ...sectionData, id: Math.floor(Math.random() * 500), textAlign: 'left', fontSize: 1.5 } }]);
            return;
        }
        if (type == 1) {
            setData(data => [...data, { sections: sectionData, type: type, width: "100%", height: "15em" }]);
            return;
        }
        if (type == 2) {
            let sections = [] as any;
            let width = (sectionData.length == 2) ? "48%" : "32%";
            sectionData.map((ele: any) => {
                if (ele.type == 0) {
                    sections.push({ width: width, type: ele.type, fontSize: 1.5, text: "Write here...", id: Math.floor(Math.random() * 500), textAlign: 'left' })
                } else {
                    sections.push({ width: width, height: "10em", type: ele.type, img: "" })
                }
            })
            setData(data => [...data, { sections: sections, type: type }]);
            return;
        }
    }

    const updateText = (id: number, value: string | number, whatToUpdate: number) => {
        const amountToIncreaseText = 0.1;
        setData(data.map(ele => {
            switch(ele.type) {
                case 0:
                    if (ele.sections.id == id) {
                        switch(whatToUpdate) {
                            case 0:
                                return { ...ele, sections: { ...ele.sections, text: value } }
                                break;
                            case 1:
                                return { ...ele, sections: { ...ele.sections, textAlign: value } }
                                break;
                            case 2:
                                return { ...ele, sections: { ...ele.sections, fontSize: (Math.round((value == 0 ? ele.sections.fontSize + amountToIncreaseText : ele.sections.fontSize - amountToIncreaseText) * 100) / 100) } }
                                break;
                        }
                    }
                    break;
                case 2:
                    let newSections = ele.sections.map((sEle: any) => {
                        if (sEle.type == 0 && sEle.id == id) {
                            switch(whatToUpdate) {
                                case 0:
                                    return { ...sEle, text: value };
                                    break;
                                case 1:
                                    return { ...sEle, textAlign: value };
                                    break;
                                case 2:
                                    //(value == 0) ? 1.5 : 2
                                    return {...sEle, fontSize: (Math.round((value == 0 ? sEle.fontSize + amountToIncreaseText : sEle.fontSize - amountToIncreaseText) * 100) / 100)}
                                    break;
                            }
                        } else {
                            return sEle;
                        }
                    });
                    return { ...ele, sections: newSections };
                    break;
            }
            return ele;
        }))
    }

    const whichTypeOfSectionToRender = (type: number, sectionData: any, key: number) => {
        switch (type) {
            case 0:
                return (
                    <ParaInput fontSize = {sectionData.fontSize} textAlign = {sectionData.textAlign} key={key} id={sectionData.id} pageCreation={true} paragraphValue={sectionData.text} setParagraphValue={updateText} editMode={editMode} title={null} margin={"auto"} width={sectionData.width} />
                )
                break;
            case 1:
                return (
                    <ImageMod key={key} width={sectionData.width} height={sectionData.height} src={sectionData.img} />
                )
                break;
            case 2:
                return (
                    <MultiSectionDisplay key = {key} sectionData = {sectionData} whichTypeOfSectionToRender = {whichTypeOfSectionToRender} />
                );
                break;
        }
    }

    return (
        <PageCreationContext.Provider value={{ choice: createWhat }}>
            <Component>
                {
                    data.map((ele, i) => whichTypeOfSectionToRender(ele.type, ele.sections, i))
                }
                <ButtonContainer>
                    <AddModule onClick={() => { setShow(true) }}>Add</AddModule>
                    <AddModule onClick={() => { setEditMode(!editMode) }}>Change Edit Mode</AddModule>
                </ButtonContainer>
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