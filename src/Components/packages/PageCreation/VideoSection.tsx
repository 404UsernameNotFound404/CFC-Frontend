import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../../Context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Video = styled.iframe`
    width: 100%;
    height: 40em;
`;

const InputContainer = styled.div`
    height: 40em;
    background-color: lightgrey;
    border: grey thin solid;
    width: 100%;
    display: flex;
`;

const InputContent = styled.div`
    display: flex;
    margin: auto;
    height: fit-content;
`;

const InputVid = styled.input`
    width: 15em;
    margin: 0 auto;
    padding: 0.5em 0em;
    font-size: 1em;
    border: none;
    background-color: transparent;
    border-bottom: thin solid grey;
    &:focus {
        outline: none;
    }
`;

const ConfirmIcon = styled.h4`
    margin: auto;
    margin-left: 0.25em;
    padding: 0.25em 0.5em;
    height: 100%;
    &:hover {
        background-color: grey;
    }
`;

type Props = {
    vidID: string,
    id: number,
    addVideo: any
}

function VideoSection(props: Props) {
    const [youtubeLink, setYoutubeLink] = useState("");
    const c = useContext(AppContext);
    const { vidID, addVideo } = props;
    const checkIcon = <FontAwesomeIcon icon={faCheck} />

    const checkVideo = async () => {
        try {
            c.setMessageToUser({ message: "Loading", colour: "Black" })
            let id = youtubeLink.split("v=")[1];
            //clean up id if in a playlist
            for (let x = 0; x < id.length; x++) {
                if (id[x] == "&") {
                    id = id.substring(0, x);
                    break;
                }
            }
            console.log("VIDEO ID: " + id)
            let resRaw = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyADa85-LcewVSXYmzHDUVjfvMDGVhZ_1_M`, {
                method: "GET"
            });
            const res = await resRaw.json();
            console.log(res)
            if (res.items.length <= 0) throw "No Video Connected To Link"
            c.setMessageToUser({ message: "Found Video! Loading it into page...", colour: "green" })
            addVideo(props.id, id);
        } catch (err) {
            if (typeof err == "string") {
                c.setMessageToUser({ message: err, colour: "red" })
                return;
            }
            c.setMessageToUser({ message: "Error Embedding Video", colour: "red" })
        }
    }

    return (
        (vidID.length >= 1) ?
            <Video
                src={`https://www.youtube.com/embed/${vidID}`} frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
            :
            <InputContainer>
                <InputContent>
                    <InputVid placeholder = {"Copy And Paste URL"} type="string" value={youtubeLink} onChange={(e) => { setYoutubeLink(e.target.value) }} />
                    <ConfirmIcon onClick = {checkVideo}>{checkIcon}</ConfirmIcon>
                </InputContent>
            </InputContainer>
    );
}

//width="560" height="315" 

export default VideoSection;