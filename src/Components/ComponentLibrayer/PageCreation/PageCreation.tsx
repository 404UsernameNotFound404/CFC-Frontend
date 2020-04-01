import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../Pages/Page/ContactModal';
import ModulePicker from './ModalComps/PickModule';
import ParaInput from '../ParaInput/ParaInput';
import { PageCreationContext } from '../../../Context/PageCreationContext';
import MultiSectionDisplay from './MultiSectionDisplay';
import PageCreationMenu from './SectionSelection/PageCreationMenue';

import Image1 from '../../../img/BothOfUsPhoto.jpg';
import Image2 from '../../../img/climateMarch.jpg';
import Image3 from '../../../img/default.jpg';
import PickImage from './ModalComps/PickImage';

import SectionDisplay from './SectionDisplay'
import VideoSection from './VideoSection';



const Component = styled.div`
    width: 90%;
    margin: auto;
`;

const ButtonContainer = styled.div`
    display: flex;
`;

const AddModule = styled.div`
    width: 2.25rem;
    height: 2.25rem;
    /* background-color: #46f646; */
    border: thin solid #46f646;
    font-size: 2em;
    text-align: center;
    font-size: 1.5em;
    color: #46f646;
    border-radius: 50%;
    line-height: 2.25rem;
    cursor: pointer;
    margin-top: 0.5em;
    &:hover {
        color: #0bd50b;
    }
`;

type ImageModProps = {
    width: string,
    height: string
}

const ImageMod = styled.img<ImageModProps>`
    width: ${p => p.width};
    min-height: ${p => p.height};
    max-height: 30em;
    height: auto;
    margin: auto 0;
    background-color: grey;
    object-fit: cover;
`;

function PageCreation() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(true);
    const [pickImage, setPickImage] = useState({ id: -1, show: true });

    const ImageData = [
        { imageSrc: "https://connecting-for-change.ca/static/media/protesterYelling.5313dcad.webp" },
        { imageSrc: Image2 },
        { imageSrc: Image3 }
    ];

    const createWhat = (type: number, sectionData?: any) => {
        setShow(false);
        switch (type) {
            case 0:
                setData(data => [...data, { type: type, id: Math.floor(Math.random() * 3000), sections: { width: "75%", text: "Start Writing Here...", textAlign: 'left', fontSize: 1.5 } }]);
                break;
            case 1:
                setData(data => [...data, { type: type, id: Math.floor(Math.random() * 3000), sections: { imgSrc: "", width: "100%", height: "15em" } }]);
                break;
            case 2:
                let sections = [] as any;
                let width = (sectionData.length == 2) ? "48%" : "32%";
                sectionData.map((ele: any) => {
                    if (ele.type == 0) {
                        sections.push({ width: width, type: ele.type, fontSize: 1.5, text: "Write here...", id: Math.floor(Math.random() * 3000), textAlign: 'left' })
                    } else {
                        sections.push({ width: width, height: "10em", type: ele.type, imgSrc: "", id: Math.floor(Math.random() * 3000) })
                    }
                });
                setData(data => [...data, { id: Math.floor(Math.random() * 3000), sections: sections, type: type }]);
                break;
            case 3:
                setData(data => [...data, { type: 3, id: Math.floor(Math.random() * 3000), sections: { vidID: "" } }]);
            break;
        }
    }

    const updateText = (id: number, value: string | number, whatToUpdate?: number) => {
        setData(data.map(ele => {
            switch (ele.type) {
                case 0:
                    console.log("Hello")
                    if (ele.id == id) {
                        console.log("found id")
                        switch (whatToUpdate) {
                            case 0:
                                return { ...ele, sections: { ...ele.sections, text: value } }
                                break;
                            case 1:
                                return { ...ele, sections: { ...ele.sections, textAlign: value } }
                                break;
                            case 2:
                                return { ...ele, sections: { ...ele.sections, fontSize: (value == 0) ? 2 : 1.5 } }
                                break;
                        }
                    }
                    break;
                case 2:
                    let newSections = ele.sections.map((sEle: any) => {
                        if (sEle.type == 0 && sEle.id == id) {
                            switch (whatToUpdate) {
                                case 0:
                                    return { ...sEle, text: value };
                                    break;
                                case 1:
                                    return { ...sEle, textAlign: value };
                                    break;
                                case 2:
                                    //(value == 0) ? 1.5 : 2
                                    return { ...sEle, fontSize: (value == 0) ? 2 : 1.5 }
                                    break;
                            }
                        } else {
                            return sEle;
                        }
                    });
                    return { ...ele, sections: newSections };
                    break;
                case 3:
                    return { ...ele, sections: { ...ele.sections, vidID: value } }
                    break;
            }
            return ele;
        }))
    }

    const whichTypeOfSectionToRender = (type: number, sectionData: any, key: number, id: number, isFullSection?: boolean) => {
        const fullSection = (isFullSection != undefined ? isFullSection : true);
        switch (type) {
            case 0:
                return (
                    fullSection ?
                    <SectionDisplay numberOfSections = {data.length} index = {key} moveSection = {switchOrder} deleteSection = {deleteSection} key={key} id = {id} width = {"100%"}>
                        <ParaInput fontSize={sectionData.fontSize} textAlign={sectionData.textAlign}  id={id} pageCreation={true} paragraphValue={sectionData.text} setParagraphValue={updateText} editMode={editMode} title={null} margin={"0 auto"} width={sectionData.width} />
                    </SectionDisplay> : 
                    <ParaInput fontSize={sectionData.fontSize} textAlign={sectionData.textAlign} key={key} id={id} pageCreation={true} paragraphValue={sectionData.text} setParagraphValue={updateText} editMode={editMode} title={null} margin={"0 auto"} width={sectionData.width} />

                )
                break;
            case 1:
                return (
                    fullSection ?
                    <SectionDisplay numberOfSections = {data.length} index = {key} moveSection = {switchOrder} key={key} deleteSection = {deleteSection} id = {id} width = {"100%"}>
                        <ImageMod onClick={() => { openPickImage(id) }}  width={sectionData.width} height={sectionData.height} src={sectionData.imgSrc} />
                    </SectionDisplay> :
                    <ImageMod onClick={() => { openPickImage(id) }} key={key} width={sectionData.width} height={sectionData.height} src={sectionData.imgSrc} />
                )
                break;
            case 2:
                return (
                    <SectionDisplay numberOfSections = {data.length} index = {key} moveSection = {switchOrder} key={key} deleteSection = {deleteSection} id = {id} width = {"100%"}>
                        <MultiSectionDisplay  sectionData={sectionData} whichTypeOfSectionToRender={whichTypeOfSectionToRender} />
                    </SectionDisplay>
                );
                break;
            case 3:
                return (
                    <SectionDisplay numberOfSections = {data.length} index = {key} moveSection = {switchOrder} key={key} deleteSection = {deleteSection} id = {id} width = {"100%"}>
                        <VideoSection vidID = {sectionData.vidID} id = {id} addVideo = {updateText} />
                    </SectionDisplay>
                );
                break;
        }
    }

    const openPickImage = (id: number) => {
        setShow(true);
        setPickImage({ id: id, show: true })
    }

    const switchOrder = (id: number, up: boolean) => {
        const indexToSwitch = data.findIndex((value) => value.id == id);
        if (indexToSwitch == 0 && up || indexToSwitch == data.length - 1 && !up) return;
        let dataCopy = [...data];
        const temp = dataCopy[indexToSwitch];
        dataCopy[indexToSwitch] = up ? dataCopy[indexToSwitch - 1] : dataCopy[indexToSwitch + 1];
        dataCopy[(up ? indexToSwitch - 1 : indexToSwitch + 1)] =  temp;
        setData(dataCopy);
    }

    const setImage = (id: number, imgSrc: string) => {
        setData(data.map(ele => {
            if (ele.type == 1 && ele.sections.id == id) {
                return { ...ele, sections: { ...ele.sections, imgSrc: imgSrc } }
            }
            else if (ele.type == 2) {
                return {
                    ...ele, sections: ele.sections.map((eleS: any) => {
                        if (eleS.type == 1 && eleS.id == id) {
                            return { ...eleS, imgSrc: imgSrc }
                        }
                        return eleS;
                    })
                }
            }
            return ele;
        }))
    }

    const deleteSection = (id: number) => {
        setData(data.filter(ele => !(ele.id == id) ));
    }

    return (
        <PageCreationContext.Provider value={{ choice: createWhat }}>
            <Component>
                {console.log(JSON.stringify(data))}
                {
                    data.map((ele, i) => whichTypeOfSectionToRender(ele.type, ele.sections, i, ele.id))
                }
                <PageCreationMenu createMultiSection={() => { setShow(true); setPickImage({ id: pickImage.id, show: false }) }} createSection={createWhat} />
                {
                    show ?
                        <Modal width={"90%"} close={show} setClose={setShow}>
                            {
                                !pickImage.show ?
                                    <ModulePicker choice={createWhat} /> :
                                    <PickImage setImage={setImage} id={pickImage.id} imageData={ImageData} />
                            }
                        </Modal>
                        : ''
                }

            </Component>
        </PageCreationContext.Provider>
    )
}

export default PageCreation;

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